//@ts-nocheck
import { all, call, put, takeEvery } from 'redux-saga/effects';

function* fetchDataSaga() {
  try {
    const response = yield call(fetch, 'https://api.example.com/data');
    const data = yield response.json();

    yield put({ type: 'FETCH_DATA_SUCCESS', payload: data });
  } catch (error) {
    //@ts-ignore
    yield put({ type: 'FETCH_DATA_FAILURE', payload: error.message });
  }
}

function* watchFetchData() {
  yield takeEvery('FETCH_DATA_REQUEST', fetchDataSaga);
}

export default watchFetchData;

