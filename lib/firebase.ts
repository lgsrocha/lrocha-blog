// var firebase = require('firebase/compat/app')
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseStorage } from "firebase/storage";

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

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
