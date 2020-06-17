import {
    REGISTER,
    LOGIN,
    AUTHENTICATE_FAIL,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_START,
    AUTH_DISMISS_ERROR,
    CHECK_AUTH_STATE,
    EMPTY_AUTH_STATE,
    LOGOUT,
    LOGOUT_START,
    LOGOUT_END,
    SET_AUTH_STATE,
} from './actionTypes';
import * as authTypes from '../types/auth.module';

export const register: (authData: authTypes.registerInputType) => authTypes.registerType = (authData) => {
    return {
        type: REGISTER,
        authData,
    };
};

export const login: (authData: authTypes.loginInputType) => authTypes.loginType = (authData) => {
    return {
        type: LOGIN,
        authData,
    };
};

export const authenticateStart: () => authTypes.authenticateStartType = () => {
    return {
        type: AUTHENTICATE_START,
    };
};

export const authenticateSuccess: (userData: authTypes.userData) => authTypes.authenticateSuccessType = (userData) => {
    return {
        type: AUTHENTICATE_SUCCESS,
        userData,
    };
};

export const authenticateFail: (error: any) => authTypes.authenticateFailType = (error) => {
    return {
        type: AUTHENTICATE_FAIL,
        error,
    };
};

export const authDismissError: () => authTypes.authDismissErrorType = () => {
    return {
        type: AUTH_DISMISS_ERROR,
    };
};

export const setAuthState: () => authTypes.setAuthStateType = () => {
    return {
        type: SET_AUTH_STATE,
    };
};

export const checkAuthState: () => authTypes.checkAuthStateType = () => {
    return {
        type: CHECK_AUTH_STATE,
    };
};

export const emptyAuthState: () => authTypes.emptyAuthStateType = () => {
    return {
        type: EMPTY_AUTH_STATE,
    };
};

export const logout: () => authTypes.logoutType = () => {
    return {
        type: LOGOUT,
    };
};

export const logoutStart: () => authTypes.logoutStartType = () => {
    return {
        type: LOGOUT_START,
    };
};

export const logoutEnd: () => authTypes.logoutEndType = () => {
    return {
        type: LOGOUT_END,
    };
};
