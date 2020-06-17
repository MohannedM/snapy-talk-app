import {} from 'redux-saga';
import { registerSaga, loginSaga, checkAuthStateSaga, logoutSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import { REGISTER, LOGIN, CHECK_AUTH_STATE, LOGOUT } from '../actions/actionTypes';

export function* authSaga() {
    yield takeEvery(REGISTER, registerSaga);
    yield takeEvery(LOGIN, loginSaga);
    yield takeEvery(CHECK_AUTH_STATE, checkAuthStateSaga);
    yield takeEvery(LOGOUT, logoutSaga);
}
