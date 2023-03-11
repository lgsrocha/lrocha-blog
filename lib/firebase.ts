// var firebase = require('firebase/compat/app')
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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
export const storage = getFirestore(app)
