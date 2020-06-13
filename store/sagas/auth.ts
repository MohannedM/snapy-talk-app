import { put } from 'redux-saga/effects';
import { registerStart, registerSuccess, registerFail } from '../actions';
import { registerType } from '../types/auth.module';
import axios from 'axios';

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
        const result = yield axios.post('http://localhost:8080/graphql', graphqlQuery);
        console.log(result);
    } catch (err) {
        console.log(err);
        yield put(registerFail(err));
    }
}
