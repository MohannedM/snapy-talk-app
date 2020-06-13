import {} from 'redux-saga';
import { registerSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import { REGISTER } from '../actions/actionTypes';

export function* authSaga() {
    yield takeEvery(REGISTER, registerSaga);
}
