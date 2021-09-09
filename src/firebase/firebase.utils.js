import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
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

export const firestore = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(firestore, `users/${userAuth.uid}`);

    const userSnap = await getDoc(userRef);


    if (!userSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;


}

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);