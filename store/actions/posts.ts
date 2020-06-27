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
    EDIT_POST,
    EDIT_POST_START,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAIL,
    DELETE_POST,
    DELETE_POST_START,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    TOGGLE_LIKE_POST,
    TOGGLE_LIKE_POST_START,
    TOGGLE_LIKE_POST_SUCCESS,
    TOGGLE_LIKE_POST_FAIL,
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
    postUpdateInputType,
    editPostType,
    editPostStartType,
    editPostSuccessType,
    editPostFailType,
    deletePostType,
    deletePostStartType,
    deletePostSuccessType,
    deletePostFailType,
    toggleLikePostType,
    toggleLikePostStartType,
    toggleLikePostSuccessType,
    toggleLikePostFailType,
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

export const editPost: (postData: postUpdateInputType, token?: string | null) => editPostType = (postData, token) => {
    return {
        type: EDIT_POST,
        postData,
        token,
    };
};

export const editPostStart: () => editPostStartType = () => {
    return {
        type: EDIT_POST_START,
    };
};

export const editPostSuccess: (postData: postData) => editPostSuccessType = (postData) => {
    return {
        type: EDIT_POST_SUCCESS,
        postData,
    };
};

export const editPostFail: (error: any) => editPostFailType = (error) => {
    return {
        type: EDIT_POST_FAIL,
        error,
    };
};

export const deletePost: (postId: string, token?: string | null) => deletePostType = (postId, token) => {
    return {
        type: DELETE_POST,
        postId,
        token,
    };
};

export const deletePostStart: () => deletePostStartType = () => {
    return {
        type: DELETE_POST_START,
    };
};

export const deletePostSuccess: (postId: string) => deletePostSuccessType = (postId) => {
    return {
        type: DELETE_POST_SUCCESS,
        postId,
    };
};

export const deletePostFail: (error: any) => deletePostFailType = (error) => {
    return {
        type: DELETE_POST_FAIL,
        error,
    };
};

export const toggleLikePost: (
    postId: string,
    place: 'posts' | 'userPosts',
    token?: string | null,
    isLiked?: boolean,
) => toggleLikePostType = (postId, place, token, isLiked) => {
    return {
        type: TOGGLE_LIKE_POST,
        postId,
        token,
        place,
        isLiked,
    };
};

export const toggleLikePostStart: (postId: string, place: 'posts' | 'userPosts') => toggleLikePostStartType = (
    postId,
    place,
) => {
    return {
        type: TOGGLE_LIKE_POST_START,
        place,
        postId,
    };
};

export const toggleLikePostSuccess: (postId: string, place: 'posts' | 'userPosts') => toggleLikePostSuccessType = (
    postId,
    place,
) => {
    return {
        type: TOGGLE_LIKE_POST_SUCCESS,
        place,
        postId,
    };
};

export const toggleLikePostFail: (
    postId: string,
    place: 'posts' | 'userPosts',
    error: any,
) => toggleLikePostFailType = (postId, place, error) => {
    return {
        type: TOGGLE_LIKE_POST_FAIL,
        place,
        postId,
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
