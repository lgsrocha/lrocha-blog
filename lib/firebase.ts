var firebase = require('firebase')

import '@firebase/auth'
import '@firebase/firestorage';
import '@firebase/storage';

const firebaseConfig ={
apiKey: "AIzaSyCMkw1P7Ld-kJyksYZmqDtmN5LGULe4cmI",
  authDomain: "lrocha-dev.firebaseapp.com",
  projectId: "lrocha-dev",
  storageBucket: "lrocha-dev.appspot.com",
  messagingSenderId: "569823105552",
  appId: "1:569823105552:web:4cabb8184ad5e009793095",
  measurementId: "G-GERDT5EQ1H"
};

if (!firebase.getApps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();