import { authSaga, postsSage } from './sagas';
import authReducer, { AuthStateType } from './reducers/auth';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import postsReducer, { PostsStateType } from './reducers/posts';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    auth: authReducer,
    posts: postsReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(authSaga);
sagaMiddleware.run(postsSage);

export interface AppState {
    auth: AuthStateType;
    posts: PostsStateType;
}
