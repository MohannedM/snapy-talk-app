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
    EDIT_POST_START,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAIL,
    DELETE_POST_START,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    TOGGLE_LIKE_POST_START,
    TOGGLE_LIKE_POST_SUCCESS,
    TOGGLE_LIKE_POST_FAIL,
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
                userPosts: state.userPosts.concat(action.postData),
                loading: false,
                goBack: true,
            };
        case CREATE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case EDIT_POST_START:
            return {
                ...state,
                loading: true,
            };
        case EDIT_POST_SUCCESS:
            const userPosts = [...state.userPosts];
            const oldPostIndex = userPosts.findIndex((post) => post._id === action.postData._id);
            userPosts[oldPostIndex].title = action.postData.title;
            userPosts[oldPostIndex].imageUrl = action.postData.imageUrl;
            userPosts[oldPostIndex].description = action.postData.description;
            return {
                ...state,
                loading: false,
                goBack: true,
                userPosts,
            };
        case EDIT_POST_FAIL:
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
                posts: [],
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
                userPosts: [],
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
        case DELETE_POST_START:
            return {
                ...state,
                loading: true,
            };
        case DELETE_POST_SUCCESS:
            const userPostsCp = [...state.userPosts];
            const postIndex = userPostsCp.findIndex((post) => post._id === action.postId);
            userPostsCp.splice(postIndex, 1);
            return {
                ...state,
                userPosts: userPostsCp,
                loading: false,
                goBack: true,
            };
        case DELETE_POST_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case TOGGLE_LIKE_POST_START: {
            const posts = [...state[action.place]];
            const postIndex = posts.findIndex((post) => post._id === action.postId);
            posts[postIndex].likeLoading = true;
            return {
                ...state,
                [action.place]: posts,
            };
        }
        case TOGGLE_LIKE_POST_SUCCESS: {
            const posts = [...state[action.place]];
            const postIndex = posts.findIndex((post) => post._id === action.postId);
            posts[postIndex].isLiked = !posts[postIndex].isLiked;
            posts[postIndex].likeLoading = false;
            return {
                ...state,
                [action.place]: posts,
            };
        }
        case TOGGLE_LIKE_POST_FAIL: {
            const posts = [...state[action.place]];
            const postIndex = posts.findIndex((post) => post._id === action.postId);
            posts[postIndex].likeLoading = false;
            return {
                ...state,
                [action.place]: posts,
                error: action.error,
            };
        }
        default:
            return state;
    }
};

export default postsReducer;
