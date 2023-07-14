// var firebase = require('firebase/compat/app')
import { initializeApp } from "firebase/app";
import { collection, serverTimestamp , Firestore, getDocs, getFirestore, limit, query, Timestamp, where } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import type { TaskEvent } from 'firebase/storage';


// import '@firebase/auth'
// import '@firebase/storage-compat';
// import '@firebase/storage';

const firebaseConfig ={
apiKey: "AIzaSyCMkw1P7Ld-kJyksYZmqDtmN5LGULe4cmI",
  authDomain: "lrocha-dev.firebaseapp.com",
  projectId: "lrocha-dev",
  storageBucket: "lrocha-dev.appspot.com",
  messagingSenderId: "569823105552",
  appId: "1:569823105552:web:4cabb8184ad5e009793095",
  measurementId: "G-GERDT5EQ1H"
};


export const app = initializeApp(firebaseConfig);
// if (!firebase.getApps.length) {
//     firebase.initializeApp(firebaseConfig)
// }

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const storage : Firestore = getFirestore(app)
export const fileStorage = getStorage(app)
export const STATE_CHANGED: TaskEvent = 'state_changed';

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */


export async function getUserWithUsername(username : string) {
  const usersRef = collection(storage, "users");
  const q = query(usersRef, where("username", "==", username), limit(1));
  const querySnapshot = await getDocs(q);
  const userDoc = querySnapshot.docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc : any) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

//converte o timestamp do Firestore para um número
export const fromMillis = Timestamp.fromMillis; 
export const serverTimestamps = serverTimestamp();
