import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export default [
    thunkMiddleware,
    sagaMiddleware
]