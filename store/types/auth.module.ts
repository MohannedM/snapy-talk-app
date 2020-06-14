import {
    REGISTER,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_DISMISS_ERROR,
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

export interface registerStartType {
    type: typeof REGISTER_START;
}

export interface registerSuccessType {
    type: typeof REGISTER_SUCCESS;
    userData: userData;
}

export interface registerFailType {
    type: typeof REGISTER_FAIL;
    error: any; //Change it according to returned error type when you know it
}

export interface loginType {
    type: typeof LOGIN;
    authData: loginInputType;
}

export interface loginStartType {
    type: typeof LOGIN_START;
}

export interface loginSuccessType {
    type: typeof LOGIN_SUCCESS;
    userData: userData;
}

export interface loginFailType {
    type: typeof LOGIN_FAIL;
    error: any;
}

export interface authDismissErrorType {
    type: typeof AUTH_DISMISS_ERROR;
}

export type authActionType =
    | registerType
    | registerStartType
    | registerSuccessType
    | registerFailType
    | loginType
    | loginFailType
    | loginStartType
    | loginSuccessType
    | authDismissErrorType;
