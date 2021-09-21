import ShopActionTypes from './shop.types';

import { collection, onSnapshot } from 'firebase/firestore';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTION_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = collection(firestore, 'collections');
        dispatch(fetchCollectionsStart());

        onSnapshot(collectionRef, async snapshot => {
            const collectionMap = await convertCollectionsSnapshotToMap(collectionRef, snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap));
        }, error => dispatch(fetchCollectionsFailure(error.message)))
    }
}