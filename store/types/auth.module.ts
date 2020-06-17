import {
    REGISTER,
    LOGIN,
    AUTHENTICATE_START,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAIL,
    AUTH_DISMISS_ERROR,
    CHECK_AUTH_STATE,
    EMPTY_AUTH_STATE,
    LOGOUT,
    LOGOUT_START,
    LOGOUT_END,
    SET_AUTH_STATE,
} from '../actions/actionTypes';

export interface registerInputType {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface loginInputType {
    email: string;
    password: string;
}

export interface userData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export interface registerType {
    type: typeof REGISTER;
    authData: registerInputType;
}

export interface loginType {
    type: typeof LOGIN;
    authData: loginInputType;
}

export interface authenticateStartType {
    type: typeof AUTHENTICATE_START;
}

export interface authenticateSuccessType {
    type: typeof AUTHENTICATE_SUCCESS;
    userData: userData;
}

export interface authenticateFailType {
    type: typeof AUTHENTICATE_FAIL;
    error: any; //Change it according to returned error type when you know it
}

export interface authDismissErrorType {
    type: typeof AUTH_DISMISS_ERROR;
}

export interface checkAuthStateType {
    type: typeof CHECK_AUTH_STATE;
}

export interface emptyAuthStateType {
    type: typeof EMPTY_AUTH_STATE;
}

export interface setAuthStateType {
    type: typeof SET_AUTH_STATE;
}

export interface logoutType {
    type: typeof LOGOUT;
}

export interface logoutStartType {
    type: typeof LOGOUT_START;
}

export interface logoutEndType {
    type: typeof LOGOUT_END;
}

export type authActionType =
    | registerType
    | loginType
    | authenticateStartType
    | authenticateSuccessType
    | authenticateFailType
    | authDismissErrorType
    | checkAuthStateType
    | emptyAuthStateType
    | logoutType
    | logoutStartType
    | logoutEndType
    | setAuthStateType;
