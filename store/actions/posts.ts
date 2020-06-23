import {
    CREATE_POST,
    CREATE_POST_START,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    POSTS_DISMISS_ERROR,
    DISABLE_GO_BACK,
    GET_ALL_POSTS,
    GET_ALL_POSTS_START,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_FAIL,
    GET_USER_POSTS,
    GET_USER_POSTS_START,
    GET_USER_POSTS_SUCCESS,
    GET_USER_POSTS_FAIL,
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
    getAllPostsType,
    getAllPostsStartType,
    getAllPostsSuccessType,
    getAllPostsFailType,
    getUserPostsType,
    getUserPostsStartType,
    getUserPostsSuccessType,
    getUserPostsFailType,
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

export const getAllPosts: (token?: string | null) => getAllPostsType = (token) => {
    return {
        type: GET_ALL_POSTS,
        token,
    };
};

export const getAllPostsStart: () => getAllPostsStartType = () => {
    return {
        type: GET_ALL_POSTS_START,
    };
};

export const getAllPostsSuccess: (posts: postData[]) => getAllPostsSuccessType = (posts) => {
    return {
        type: GET_ALL_POSTS_SUCCESS,
        posts,
    };
};

export const getAllPostsFail: (error: any) => getAllPostsFailType = (error) => {
    return {
        type: GET_ALL_POSTS_FAIL,
        error,
    };
};

export const getUserPosts: (token?: string | null) => getUserPostsType = (token) => {
    return {
        type: GET_USER_POSTS,
        token,
    };
};

export const getUserPostsStart: () => getUserPostsStartType = () => {
    return {
        type: GET_USER_POSTS_START,
    };
};

export const getUserPostsSuccess: (posts: postData[]) => getUserPostsSuccessType = (posts) => {
    return {
        type: GET_USER_POSTS_SUCCESS,
        posts,
    };
};

export const getUserPostsFail: (error: any) => getUserPostsFailType = (error) => {
    return {
        type: GET_USER_POSTS_FAIL,
        error,
    };
};
