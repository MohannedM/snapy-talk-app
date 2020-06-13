import { REGISTER, REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/actionTypes';

export interface registerInputType {
    firstName: string;
    lastName: string;
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

export type authActionType = registerType | registerStartType | registerSuccessType | registerFailType;
