import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as searchActions from '../actions/search';


const getResultsFromAPI = input => axios.get('/api/search', {
  params: {
    query: input,
  },
});

export function* searchProcess(action) {
  try {
    const payload = yield call(
      getResultsFromAPI,
      action.input,
    );

    // Errors
    if (payload.data.errors) {
      yield put(searchActions.searchFailed(payload.data.errors));
    } else {
      yield put(searchActions.searchSuccess(payload.data));
    }
  } catch (e) {
    console.log('search error', e);
    yield put(searchActions.searchFailed([
      {
        type: 'request',
        message: e.message,
      },
    ]));
  }
}


export function* watchSearchRequest() {
  yield fork(
    takeEvery,
    searchActions.SEARCH_REQUEST,
    searchProcess,
  );
}
