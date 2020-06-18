import { authActionType } from '../types/auth.module';
import {
    AUTHENTICATE_START,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAIL,
    AUTH_DISMISS_ERROR,
    EMPTY_AUTH_STATE,
    LOGOUT_START,
    LOGOUT_END,
    SET_AUTH_STATE,
} from '../actions/actionTypes';

export interface AuthStateType {
    _id: string | null;
    token: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    loading: boolean;
    authCheckLoading: boolean;
    isAuthSet: boolean;
    error: any | null;
}
const initialState = {
    _id: null,
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    loading: false,
    authCheckLoading: true,
    isAuthSet: false,
    error: null,
};

const authReducer: (state: AuthStateType, action: authActionType) => AuthStateType = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_START:
            return {
                ...state,
                loading: true,
            };
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                _id: action.userData._id,
                token: action.userData.token,
                email: action.userData.email,
                firstName: action.userData.firstName,
                lastName: action.userData.lastName,
                loading: false,
                authCheckLoading: false,
            };
        case AUTHENTICATE_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
                authCheckLoading: false,
            };
        case AUTH_DISMISS_ERROR:
            return {
                ...state,
                error: null,
            };
        case SET_AUTH_STATE:
            return {
                ...state,
                isAuthSet: true,
            };
        case EMPTY_AUTH_STATE:
            return {
                ...state,
                authCheckLoading: false,
            };
        case LOGOUT_START:
            return {
                ...state,
                loading: true,
            };
        case LOGOUT_END:
            return {
                _id: null,
                token: null,
                email: null,
                firstName: null,
                lastName: null,
                loading: false,
                authCheckLoading: false,
                isAuthSet: false,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;
