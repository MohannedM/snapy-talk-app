import {
    CREATE_POST_START,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    POSTS_DISMISS_ERROR,
    DISABLE_GO_BACK,
    GET_ALL_POSTS_START,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_FAIL,
    GET_USER_POSTS_START,
    GET_USER_POSTS_SUCCESS,
    GET_USER_POSTS_FAIL,
} from '../actions/actionTypes';
import { postsActionType, postData } from '../types/posts.module';

export interface PostsStateType {
    posts: postData[];
    userPosts: postData[];
    loading: boolean;
    error: string | null;
    goBack: boolean;
}

const initialState: PostsStateType = {
    posts: [],
    userPosts: [],
    loading: false,
    error: null,
    goBack: false,
};

const postsReducer: (state: PostsStateType, action: postsActionType) => PostsStateType = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case CREATE_POST_START:
            return {
                ...state,
                loading: true,
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                userPosts: state.posts.concat(action.postData),
                loading: false,
                goBack: true,
            };
        case CREATE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case POSTS_DISMISS_ERROR:
            return {
                ...state,
                error: null,
            };
        case DISABLE_GO_BACK:
            return {
                ...state,
                goBack: false,
            };
        case GET_ALL_POSTS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.posts,
            };
        case GET_ALL_POSTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case GET_USER_POSTS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                userPosts: action.posts,
            };
        case GET_USER_POSTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default postsReducer;
