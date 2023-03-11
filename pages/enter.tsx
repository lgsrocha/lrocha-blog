import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase'
import { useContext } from "react";
import { UserContext } from "@/lib/context";
   
export default function EnterPage ({}) {
    const {user, username} = useContext(UserContext)

    //1. user signed out <SignInButton/>
    //2. user signed in <UsernameForm/>
    //3. user signed in, has username <SignOutButton/>

    return (
        <main>
            {user == "" ?
                username == "" ? <UsernameForm/> : <SignOutButton/>
                :
                <SignInButton/>
            }
        </main>
    )
}


function SignInButton() {
    const signInWithGoogle = async () => {
      await signInWithPopup(auth, googleAuthProvider)
      .then((result : any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // redux action? --> dispatch({ type: SET_USER, user });
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
        <img src={'/google.png'} /> Sign in with Google
      </button>
    );
  }


function SignOutButton() {

    return <button onClick={() => signOut(auth)
        .then(() => {
            console.log('logged out');
        })
        .catch((error) => {
            console.log(error);
        })
    }>Sign Out</button>;
}


function UsernameForm() {
    return null;
}



