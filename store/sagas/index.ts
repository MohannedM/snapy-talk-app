import {} from 'redux-saga';
import { registerSaga, loginSaga, checkAuthStateSaga, logoutSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import {
    REGISTER,
    LOGIN,
    CHECK_AUTH_STATE,
    LOGOUT,
    CREATE_POST,
    GET_ALL_POSTS,
    GET_USER_POSTS,
    EDIT_POST,
    DELETE_POST,
    TOGGLE_LIKE_POST,
} from '../actions/actionTypes';
import {
    createPostSaga,
    getAllPostsSaga,
    getUserPostsSaga,
    editPostSaga,
    deletePostSaga,
    toggleLikePostSaga,
} from './posts';

export function* authSaga() {
    yield takeEvery(REGISTER, registerSaga);
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(CHECK_AUTH_STATE, checkAuthStateSaga);
    yield takeEvery(LOGOUT, logoutSaga);
}

export function* postsSage() {
    yield takeEvery(CREATE_POST, createPostSaga);
    yield takeEvery(GET_ALL_POSTS, getAllPostsSaga);
    yield takeEvery(GET_USER_POSTS, getUserPostsSaga);
    yield takeEvery(EDIT_POST, editPostSaga);
    yield takeEvery(DELETE_POST, deletePostSaga);
    yield takeEvery(TOGGLE_LIKE_POST, toggleLikePostSaga);
}
