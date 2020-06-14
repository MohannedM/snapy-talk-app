import { put } from 'redux-saga/effects';
import { registerStart, registerSuccess, registerFail, loginStart, loginFail, loginSuccess } from '../actions';
import { registerType, loginType } from '../types/auth.module';
import axios from 'axios';

interface resultData {}

export function* registerSaga(action: registerType) {
    yield put(registerStart());
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
        const result = yield axios.post('http://e0d265767301.ngrok.io/graphql', JSON.stringify(graphqlQuery), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        yield put(registerSuccess(result.data.data.register));
    } catch (err) {
        console.log(err);
        yield put(registerFail(err));
    }
}

export function* loginSaga(action: loginType) {
    yield put(loginStart());
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
        const result = yield axios.post('http://e0d265767301.ngrok.io/graphql', graphqlQuery, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        yield put(loginSuccess(result.data.data.login));
    } catch (err) {
        console.log(err);
        yield put(loginFail(err));
    }
}
