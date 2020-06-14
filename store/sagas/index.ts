import {} from 'redux-saga';
import { registerSaga, loginSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import { REGISTER, LOGIN } from '../actions/actionTypes';

export function* authSaga() {
    yield takeEvery(REGISTER, registerSaga);
    yield takeEvery(LOGIN, loginSaga);
}
