import {
    CREATE_POST,
    CREATE_POST_START,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    POSTS_DISMISS_ERROR,
    DISABLE_GO_BACK,
} from './actionTypes';
import {
    postInputType,
    createPostType,
    createPostStartType,
    postData,
    createPostSuccessType,
    createPostFailType,
    postsDismissErrorType,
    disableGoBackType,
} from '../types/posts.module';

export const createPost: (postData: postInputType, token?: string | null) => createPostType = (postData, token) => {
    return {
        type: CREATE_POST,
        token,
        postData,
    };
};

export const createPostStart: () => createPostStartType = () => {
    return {
        type: CREATE_POST_START,
    };
};

export const createPostSuccess: (postData: postData) => createPostSuccessType = (postData) => {
    return {
        type: CREATE_POST_SUCCESS,
        postData,
    };
};

export const createPostFail: (error: string) => createPostFailType = (error) => {
    return {
        type: CREATE_POST_FAIL,
        error,
    };
};

export const postsDismissError: () => postsDismissErrorType = () => {
    return {
        type: POSTS_DISMISS_ERROR,
    };
};

export const disableGoBack: () => disableGoBackType = () => {
    return {
        type: DISABLE_GO_BACK,
    };
};
