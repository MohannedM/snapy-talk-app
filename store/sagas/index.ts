import {} from 'redux-saga';
import { registerSaga, loginSaga, checkAuthStateSaga, logoutSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import { REGISTER, LOGIN, CHECK_AUTH_STATE, LOGOUT, CREATE_POST } from '../actions/actionTypes';
import { createPostSaga } from './posts';

export function* authSaga() {
    yield takeEvery(REGISTER, registerSaga);
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(CHECK_AUTH_STATE, checkAuthStateSaga);
    yield takeEvery(LOGOUT, logoutSaga);
}

export function* postsSage() {
    yield takeEvery(CREATE_POST, createPostSaga);
}
