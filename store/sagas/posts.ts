import { put, delay } from 'redux-saga/effects';
import { createPostType, getAllPostsType, getUserPostsType } from '../types/posts.module';
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
