import { authActionType } from '../types/auth.module';
import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_DISMISS_ERROR,
} from '../actions/actionTypes';

export interface AuthStateType {
    _id: string | null;
    token: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    loading: boolean;
    error: any | null;
}
const initialState = {
    _id: null,
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    loading: false,
    error: null,
};

const authReducer: (state: AuthStateType, action: authActionType) => AuthStateType = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                _id: action.userData._id,
                token: action.userData.token,
                email: action.userData.email,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                loading: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
            };
        case LOGIN_START:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                _id: action.userData._id,
                token: action.userData.token,
                email: action.userData.email,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                loading: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case AUTH_DISMISS_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
