import { AsyncStorage } from 'react-native';
import { put, delay } from 'redux-saga/effects';
import {
    authenticateStart,
    authenticateSuccess,
    authenticateFail,
    emptyAuthState,
    logoutStart,
    logoutEnd,
} from '../actions';
import { registerType, loginType, checkAuthStateType, userData, logoutType } from '../types/auth.module';
import axios from 'axios';
import { LOCAL_HOST_URL } from '../../env';

export function* registerSaga(action: registerType) {
    yield put(authenticateStart());
    try {
        const graphqlQuery = {
            query: `
                mutation{
                    register(userInput: {firstName: "${action.authData.firstName}", lastName: "${action.authData.lastName}", email: "${action.authData.email}", password: "${action.authData.password}"}){
                        _id
                        token
                        email
                        firstName
                        lastName
                    }
                }
            `,
        };
        const result = yield axios.post(`${LOCAL_HOST_URL}/graphql`, JSON.stringify(graphqlQuery), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!result.data.data.register) {
            yield put(authenticateFail(result.data.errors[0].data.data[0].message));
            return;
        }
        yield put(authenticateSuccess(result.data.data.register));
    } catch (err) {
        yield put(authenticateFail(err));
    }
}

export function* loginSaga(action: loginType) {
    yield put(authenticateStart());
    try {
        const graphqlQuery = {
            query: `
                mutation{
                    login(userInput: {email: "${action.authData.email}", password: "${action.authData.password}"}){
                        _id
                        token
                        email
                        firstName
                        lastName
                    }
                }
            `,
        };
        const result = yield axios.post(`${LOCAL_HOST_URL}/graphql`, graphqlQuery, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!result.data.data.login) {
            yield put(authenticateFail(result.data.errors[0].data.data[0].message));
            return;
        }
        yield put(authenticateSuccess(result.data.data.login));
    } catch (err) {
        yield put(authenticateFail(err));
    }
}

export function* checkAuthStateSaga(action: checkAuthStateType) {
    yield delay(1000);
    const userData = yield AsyncStorage.getItem('userData');
    if (userData) {
        yield put(authenticateSuccess(JSON.parse(userData)));
    } else {
        yield put(emptyAuthState());
    }
}

export function* logoutSaga(action: logoutType) {
    yield put(logoutStart());
    yield AsyncStorage.removeItem('userData');
    yield put(logoutEnd());
}
