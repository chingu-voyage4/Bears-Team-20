import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as userActions from '../actions/user';


const changePwToAPI = data => axios.post('/api/auth/profile', {
  currentPassword: data.currentPassword,
  nextPassword: data.nextPassword,
  repeatPassword: data.repeatPassword,
});


export function* changePwProcess(action) {
  try {
    const payload = yield call(
      changePwToAPI,
      action.changePwData,
    );

    // Errors
    if (payload.data.errors) {
      yield put(userActions.changePwFailed(payload.data.errors));
    }

    // User data
    if (payload.data) {
      yield put(userActions.changePwSuccess());
    }
  } catch (e) {
    console.log('profile error', e);
    yield put(userActions.changePwFailed({
      request: e.message,
    }));
  }
}


export function* watchProfileRequest() {
  yield fork(
    takeEvery,
    userActions.CHANGE_PW_REQUEST,
    changePwProcess,
  );
}
