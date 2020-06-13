import { authSaga } from './sagas';
import authReducer from './reducers/auth';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    auth: authReducer,
});

sagaMiddleware.run(authSaga);

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
