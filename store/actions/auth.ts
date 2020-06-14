import {
    REGISTER,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_START,
    LOGIN,
    LOGIN_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS,
    AUTH_DISMISS_ERROR,
} from './actionTypes';
import * as authTypes from '../types/auth.module';

export const register: (authData: authTypes.registerInputType) => authTypes.registerType = (authData) => {
    return {
        type: REGISTER,
        authData,
    };
};

export const registerStart: () => authTypes.registerStartType = () => {
    return {
        type: REGISTER_START,
    };
};

export const registerSuccess: (userData: authTypes.userData) => authTypes.registerSuccessType = (userData) => {
    return {
        type: REGISTER_SUCCESS,
        userData,
    };
};

export const registerFail: (error: any) => authTypes.registerFailType = (error) => {
    return {
        type: REGISTER_FAIL,
        error,
    };
};

export const login: (authData: authTypes.loginInputType) => authTypes.loginType = (authData) => {
    return {
        type: LOGIN,
        authData,
    };
};

export const loginStart: () => authTypes.loginStartType = () => {
    return {
        type: LOGIN_START,
    };
};

export const loginSuccess: (userData: authTypes.userData) => authTypes.loginSuccessType = (userData) => {
    return {
        type: LOGIN_SUCCESS,
        userData,
    };
};

export const loginFail: (error: any) => authTypes.loginFailType = (error) => {
    return {
        type: LOGIN_FAIL,
        error,
    };
};

export const authDismissError: () => authTypes.authDismissErrorType = () => {
    return {
        type: AUTH_DISMISS_ERROR,
    };
};
