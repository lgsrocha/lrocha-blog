import { collection, doc, DocumentData, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage} from "./firebase";


export function useUserData() {
const [user] = useAuthState(auth);
const [username, setUsername] = useState(null);


  useEffect(() => {
    // turn off realtime subscription
     
    let unsubscribe : any
    if (user) {
      const uidRef = doc(storage, "users", user.uid);  
      (async () => {
        const unsubscribe = await getDoc(uidRef)
         if (unsubscribe.exists()){
          setUsername(unsubscribe.data().username)
         }
        }
         )();
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return {user, username}
}