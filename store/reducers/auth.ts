import { authActionType } from '../types/auth.module';
import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/actionTypes';

interface initialStateType {
    _id: string | null;
    token: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    loading: boolean;
}
const initialState = {
    _id: null,
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    loading: false,
};

const authReducer: (state: initialStateType, action: authActionType) => initialStateType = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
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
        default:
            return state;
    }
};

export default authReducer;
