import { put, delay } from 'redux-saga/effects';
import {
    createPostType,
    getAllPostsType,
    getUserPostsType,
    editPostType,
    deletePostType,
    toggleLikePostType,
} from '../types/posts.module';
import {
    createPostStart,
    createPostFail,
    createPostSuccess,
    disableGoBack,
    getAllPostsStart,
    getAllPostsFail,
    getUserPostsStart,
    getUserPostsFail,
    getAllPostsSuccess,
    getUserPostsSuccess,
    editPostStart,
    editPostFail,
    editPostSuccess,
    deletePostStart,
    deletePostFail,
    deletePostSuccess,
    toggleLikePostStart,
    toggleLikePostFail,
    toggleLikePostSuccess,
} from '../actions';
import axios from 'axios';
import { LOCAL_HOST_URL } from '../../env';

export function* createPostSaga(action: createPostType) {
    yield put(createPostStart());
    try {
        // console.log(action.postData);
        // let formData = new FormData();
        // const names = action.postData.imageUri.split('/');
        // const name = names[names.length - 1];
        // formData.append('image', action.postData.imageUri, name);

        // yield fetch(`${LOCAL_HOST_URL}/api/add-image`, {
        //     method: 'PUT',
        //     headers: {
        //         Authorization: `Bearer ${action.token}`,
        //     },
        //     body: formData,
        // });

        // const imageUrl = yield axios.put(`${LOCAL_HOST_URL}/api/add-image`, formData, {
        //     headers: {
        //         Authorization: `Bearer ${action.token}`,
        //         'Content-Type': 'multipart/form-data',
        //     },
        // });
        const graphqlQuery = {
            query: `
                mutation{
                    createPost(postInput: {title: "${action.postData.title}", description: "${action.postData.description}", imageUrl: "${action.postData.imageUri}"}){
                        _id
                        title
                        description
                        imageUrl
                        user{
                            _id
                            firstName
                            lastName
                        }
                        createdAt
                        updatedAt
                    }
                }
            `,
        };
        const result = yield axios.post(`${LOCAL_HOST_URL}/graphql`, graphqlQuery, {
            headers: {
                Authorization: `Bearer ${action.token}`,
            },
        });
        yield put(createPostSuccess(result.data.data.createPost));
        yield delay(100);
        yield put(disableGoBack());
    } catch (err) {
        console.log(err);
        yield put(createPostFail(err));
    }
}

export function* getAllPostsSaga(action: getAllPostsType) {
    yield put(getAllPostsStart());
    try {
        const graphqlQuery = {
            query: `{
                getAllPosts{
                    _id
                    title
                    description
                    imageUrl
                    createdAt
                    updatedAt
                    isLiked
                    user{
                        _id
                        firstName
                        lastName
                    }
                    likers{
                        _id
                    }
                }
            }`,
        };

        const result = yield axios.post(`${LOCAL_HOST_URL}/graphql`, graphqlQuery, {
            headers: {
                Authorization: `Bearer ${action.token}`,
            },
        });
        yield put(getAllPostsSuccess(result.data.data.getAllPosts));
    } catch (error) {
        console.log(error);
        yield put(getAllPostsFail(error));
    }
}

export function* getUserPostsSaga(action: getUserPostsType) {
    yield put(getUserPostsStart());
    try {
        const graphqlQuery = {
            query: `{
                getUserPosts{
                    _id
                    title
                    description
                    imageUrl
                    createdAt
                    updatedAt
                    isLiked
                    user{
                        _id
                        firstName
                        lastName
                    }
                    likers{
                        _id
                    }
                }
            }`,
        };

        const result = yield axios.post(`${LOCAL_HOST_URL}/graphql`, graphqlQuery, {
            headers: {
                Authorization: `Bearer ${action.token}`,
            },
        });
        yield put(getUserPostsSuccess(result.data.data.getUserPosts));
    } catch (error) {
        console.log(error);
        yield put(getUserPostsFail(error));
    }
}

export function* editPostSaga(action: editPostType) {
    yield put(editPostStart());
    try {
        const graphqlQuery = {
            query: `
                mutation{
                    updatePost(postInput: {postId: "${action.postData.postId}", title: "${action.postData.title}",  description: "${action.postData.description}", imageUrl: "${action.postData.imageUri}"}){
                        _id
                        title
                        description
                        imageUrl
                        user{
                            _id
                        }
                    }
                }
            `,
        };
        const result = yield axios.post(`${LOCAL_HOST_URL}/graphql`, graphqlQuery, {
            headers: {
                Authorization: `Bearer ${action.token}`,
            },
        });

        yield put(editPostSuccess(result.data.data.updatePost));
        yield delay(100);
        yield put(disableGoBack());
    } catch (error) {
        yield put(editPostFail(error));
    }
}

export function* deletePostSaga(action: deletePostType) {
    yield put(deletePostStart());
    try {
        const graphqlQuery = {
            query: `
                mutation{
                    deletePost(postId: "${action.postId}")
                }
            `,
        };
        yield axios.post(`${LOCAL_HOST_URL}/graphql`, graphqlQuery, {
            headers: {
                Authorization: `Bearer ${action.token}`,
            },
        });
        yield put(deletePostSuccess(action.postId));
        yield delay(100);
        yield put(disableGoBack());
    } catch (error) {
        yield put(deletePostFail(error));
    }
}

export function* toggleLikePostSaga(action: toggleLikePostType) {
    yield put(toggleLikePostStart(action.postId, action.place));
    try {
        const mutationAction = action.isLiked ? 'dislikePost' : 'likePost';
        const graphqlQuery = {
            query: `
            mutation{
                ${mutationAction}(postId: "${action.postId}")
            }
            `,
        };

        yield axios.post(`${LOCAL_HOST_URL}/graphql`, graphqlQuery, {
            headers: {
                Authorization: `Bearer ${action.token}`,
            },
        });

        yield put(toggleLikePostSuccess(action.postId, action.place));
    } catch (error) {
        yield put(toggleLikePostFail(action.postId, action.place, error));
    }
}
