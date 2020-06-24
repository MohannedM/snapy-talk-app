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
} from '../actions/actionTypes';
import { userData } from './auth.module';

export interface postInputType {
    title: string;
    description: string;
    imageUri: string;
}

export interface postData {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    user: userData;
    likers?: userData[];
    createdAt?: string;
    updatedAt?: string;
}

export interface createPostType {
    type: typeof CREATE_POST;
    token?: string | null;
    postData: postInputType;
}

export interface createPostStartType {
    type: typeof CREATE_POST_START;
}

export interface createPostSuccessType {
    type: typeof CREATE_POST_SUCCESS;
    postData: postData;
}

export interface createPostFailType {
    type: typeof CREATE_POST_FAIL;
    error: string;
}

export interface postsDismissErrorType {
    type: typeof POSTS_DISMISS_ERROR;
}

export interface disableGoBackType {
    type: typeof DISABLE_GO_BACK;
}

export interface getAllPostsType {
    type: typeof GET_ALL_POSTS;
    token?: string | null;
}

export interface getAllPostsStartType {
    type: typeof GET_ALL_POSTS_START;
}

export interface getAllPostsSuccessType {
    type: typeof GET_ALL_POSTS_SUCCESS;
    posts: postData[];
}

export interface getAllPostsFailType {
    type: typeof GET_ALL_POSTS_FAIL;
    error: any;
}

export interface getUserPostsType {
    type: typeof GET_USER_POSTS;
    token?: string | null;
}

export interface getUserPostsStartType {
    type: typeof GET_USER_POSTS_START;
}

export interface getUserPostsSuccessType {
    type: typeof GET_USER_POSTS_SUCCESS;
    posts: postData[];
}

export interface getUserPostsFailType {
    type: typeof GET_USER_POSTS_FAIL;
    error: any;
}

export type postsActionType =
    | createPostType
    | createPostSuccessType
    | createPostStartType
    | createPostFailType
    | postsDismissErrorType
    | disableGoBackType
    | getAllPostsType
    | getAllPostsStartType
    | getAllPostsSuccessType
    | getAllPostsFailType
    | getUserPostsType
    | getUserPostsStartType
    | getUserPostsSuccessType
    | getUserPostsFailType;
