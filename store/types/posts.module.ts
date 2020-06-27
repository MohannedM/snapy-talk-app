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
    LIKE_POST,
    LIKE_POST_START,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
    DISLIKE_POST,
    DISLIKE_POST_START,
    DISLIKE_POST_SUCCESS,
    DISLIKE_POST_FAIL,
} from '../actions/actionTypes';
import { userData } from './auth.module';

export interface postInputType {
    title: string;
    description: string;
    imageUri: string;
}

export interface postUpdateInputType {
    postId: string;
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
    isLiked?: boolean;
    likeLoading?: boolean;
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
    error: any;
}

export interface editPostType {
    type: typeof EDIT_POST;
    token?: string | null;
    postData: postUpdateInputType;
}

export interface editPostStartType {
    type: typeof EDIT_POST_START;
}

export interface editPostSuccessType {
    type: typeof EDIT_POST_SUCCESS;
    postData: postData;
}

export interface editPostFailType {
    type: typeof EDIT_POST_FAIL;
    error: any;
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

export interface deletePostType {
    type: typeof DELETE_POST;
    postId: string;
    token?: string | null;
}

export interface deletePostStartType {
    type: typeof DELETE_POST_START;
}

export interface deletePostSuccessType {
    type: typeof DELETE_POST_SUCCESS;
    postId: string;
}

export interface deletePostFailType {
    type: typeof DELETE_POST_FAIL;
    error: any;
}

export interface likePostType {
    type: typeof LIKE_POST;
    token?: string | null;
    postId: string;
    place: 'posts' | 'userPosts';
}

export interface likePostStartType {
    type: typeof LIKE_POST_START;
    postId: string;
    place: 'posts' | 'userPosts';
}

export interface likePostSuccessType {
    type: typeof LIKE_POST_SUCCESS;
    postId: string;
    place: 'posts' | 'userPosts';
}

export interface likePostFailType {
    type: typeof LIKE_POST_FAIL;
    postId: string;
    error: any;
    place: 'posts' | 'userPosts';
}

export interface dislikePostType {
    type: typeof DISLIKE_POST;
    token?: string | null;
    postId: string;
    place: 'posts' | 'userPosts';
}

export interface dislikePostStartType {
    type: typeof DISLIKE_POST_START;
    postId: string;
    place: 'posts' | 'userPosts';
}

export interface dislikePostSuccessType {
    type: typeof DISLIKE_POST_SUCCESS;
    postId: string;
    place: 'posts' | 'userPosts';
}

export interface dislikePostFailType {
    type: typeof DISLIKE_POST_FAIL;
    postId: string;
    error: any;
    place: 'posts' | 'userPosts';
}

export type postsActionType =
    | createPostType
    | createPostSuccessType
    | createPostStartType
    | createPostFailType
    | editPostType
    | editPostStartType
    | editPostSuccessType
    | editPostFailType
    | postsDismissErrorType
    | disableGoBackType
    | getAllPostsType
    | getAllPostsStartType
    | getAllPostsSuccessType
    | getAllPostsFailType
    | getUserPostsType
    | getUserPostsStartType
    | getUserPostsSuccessType
    | getUserPostsFailType
    | deletePostFailType
    | deletePostStartType
    | deletePostType
    | deletePostSuccessType
    | likePostFailType
    | likePostStartType
    | likePostStartType
    | likePostSuccessType
    | dislikePostFailType
    | dislikePostStartType
    | dislikePostStartType
    | dislikePostSuccessType;
