import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider, storage } from '../lib/firebase'
import { BaseSyntheticEvent, useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/context";
import { collection, doc, getDoc, getDocFromServer, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import debounce from 'lodash.debounce';
import Link from 'next/link';

   
export default function EnterPage ({}) {
    const {user, username} = useContext(UserContext)
    
    //1. user signed out <SignInButton/>
    //2. user signed in <UsernameForm/>
    //3. user signed in, has username <SignOutButton/>

    return (
        <main>
            {user ?
                !username ? <UsernameForm/> : <SignOutButton/>
                :
                <SignInButton/>
            }
        </main>
    )
}


function SignInButton() {
    const router = useRouter();
    const signInWithGoogle = async () => {
      await signInWithPopup(auth, googleAuthProvider)
      .then((result : any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });
        router.push('/');
    })
    .catch((error : any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
    };
  
    return (
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={'/google.svg'} /> Sign in with Google
      </button>
    );
  }


export function SignOutButton() {

    return <Link href="/" ><button className='logoutArea' onClick={() => signOut(auth)
      .then(() => {
          console.log('logged out');
      })
      .catch((error) => {
          console.log(error);
      })
  }></button></Link>;
}

  //Precisa ser ajustado, o refresh da página foi implementado como quickfix
function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, username } = useContext(UserContext);
  
    const onSubmit = async (e : React.FormEvent) => {
      e.preventDefault();
  
      // Create refs for both documents 
      const userDoc = doc(storage, `users/${user?.uid}`);
      const usernameDoc = doc(storage, `usernames/${formValue}`);
  
      // Commit both docs together as a batch write.
      const batch = writeBatch(storage);
      batch.set(userDoc, { username: formValue, photoURL: user?.photoURL, displayName: user?.displayName });
      batch.set(usernameDoc, { uid: user?.uid });
  
      await batch.commit();
      router.push('/');
      location.reload();
    };
  
    const onChange = (e : BaseSyntheticEvent) => {
      // Force form value typed in form to match correct format
      
      const val : string = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
      
  
      // Only set form value if length is < 3 OR it passes regex
      if (val.length < 3) {
        setFormValue(val);
        setLoading(false);
        setIsValid(false);
      }
  
      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };
  
    //
  
    useEffect(() => {
      checkUsername(formValue);
    }, [formValue]);

    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
      debounce(async (username: string) => {
        if (username.length >= 3) {
          const ref = doc(storage, `usernames/${username}`)
          //const docSnap = ;
          if ((await getDocFromServer(ref)).exists()){
            setIsValid(false)
          } else {
            setIsValid(true)
          }
          console.log('Read no firestore!');
          ;
          setLoading(false);
        }
      }, 500),
      []
    );
  
    return (
        <>
            {
                !username && (
                    <section className='usernameSelection'>
                    <h3>Escolha seu nome de usuário</h3>
                    <form onSubmit={onSubmit}>
                        <input name="username" placeholder="meuApelido" value={formValue} onChange={onChange} />
                        <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                        <button type="submit" className="btn-green" disabled={!isValid}>
                        Escolher
                        </button>
            
                        {/* <h3>Para Debug</h3>
                        <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Válido? {isValid.toString()}
                        </div> */}
                    </form>
                    </section>
                )
            }
        </>
    );
  }
  
  function UsernameMessage({ username, isValid, loading } : 
    {username : string, isValid :boolean, loading : boolean}) {
    if (loading) {
      return <p>Checkando...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} Disponível!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">Este nome de usuário já foi escolhido</p>;
    } else {
      return <p>Digite um nome curto ou apelido!</p>;
    }
  }



