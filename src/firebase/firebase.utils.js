import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, writeBatch, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(firestore, collectionKey);

    const batch = writeBatch(firestore);

    objectsToAdd.forEach(obj => {
        const newDocRef = doc(collectionRef);
        setDoc(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = async (collectionRef, collections) => {
    const transformedCollection = [];
    const querySnapshot = await getDocs(collectionRef, collections)
    querySnapshot.forEach((doc) => {
        const { title, items } = doc.data();
        transformedCollection.push({
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        })
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

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

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        if (auth.currentUser) {
            resolve(auth.currentUser);
        }
        const unsubscribe = onAuthStateChanged(auth, user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);