import { REGISTER, REGISTER_FAIL, REGISTER_SUCCESS, REGISTER_START } from './actionTypes';
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
