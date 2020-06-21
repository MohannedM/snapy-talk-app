import {
    CREATE_POST,
    CREATE_POST_START,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    POSTS_DISMISS_ERROR,
    DISABLE_GO_BACK,
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
    user: userData | string;
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

export type postsActionType =
    | createPostType
    | createPostSuccessType
    | createPostStartType
    | createPostFailType
    | postsDismissErrorType
    | disableGoBackType;
