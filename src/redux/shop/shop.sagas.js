import { takeLatest, call, put, all } from 'redux-saga/effects';
import { collection, getDocs } from 'firebase/firestore';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionAsync() {
    try {
        const collectionRef = collection(firestore, 'collections');
        const snapshot = yield getDocs(collectionRef);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, collectionRef, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}