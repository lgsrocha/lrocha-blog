import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "./firebase";


export function useUserData() {
const [user] = useAuthState(auth);
const [username, setUsername] = useState(null);


  useEffect(() => {
    // turn off realtime subscription
     
    let unsubscribe : any
    if (user) {
      const ref = doc(storage, "users", user.uid);  
      (async () => {
        unsubscribe = await getDoc(ref)})();
        setUsername(unsubscribe?.username);
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return {user, username}
}