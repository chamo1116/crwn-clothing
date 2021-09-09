import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyDmiQ2KIulzlkTtDT6WBMCo9gez0HnpG2Q",
    authDomain: "crwn-db-2fb9e.firebaseapp.com",
    projectId: "crwn-db-2fb9e",
    storageBucket: "crwn-db-2fb9e.appspot.com",
    messagingSenderId: "782486880834",
    appId: "1:782486880834:web:ab78f54d50edfcb31963db"

};

const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);