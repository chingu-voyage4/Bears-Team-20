import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as profileActions from '../actions/profile';


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
      yield put(profileActions.changePwFailed(payload.data.errors));
    }

    // User data
    if (payload.data) {
      yield put(profileActions.changePwSuccess());
    }
  } catch (e) {
    console.log('profile error', e);
    yield put(profileActions.changePwFailed({
      request: e.message,
    }));
  }
}


export function* watchProfileRequest() {
  yield fork(
    takeEvery,
    profileActions.CHANGE_PW_REQUEST,
    changePwProcess,
  );
}
