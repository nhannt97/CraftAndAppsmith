import { all, call, put, takeEvery } from 'redux-saga/effects';
import watchFetchData from './sagas';
import watchEvent from './eventSaga';
import { eventEmitter } from '../../SharedComponents/events';

export default function* rootSaga() {
    yield all([
      watchFetchData(),
      watchEvent()
      // Other sagas...
    ]);
  
}