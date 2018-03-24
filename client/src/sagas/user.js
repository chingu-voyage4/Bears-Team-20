import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as userActions from '../actions/user';


//= =======================================
// CHECKIN

const getProfile = () => axios.get('/api/auth/profile');

export function* checkinProcess() {
  try {
    const payload = yield call(getProfile);

    // Errors
    if (payload.data.errors) {
      yield put(userActions.userLogout());
    }

    // User data
    if (payload.data) {
      yield put(userActions.userLogin(payload.data));
    }
  } catch (e) {
    console.log('login error', e);
    yield put(userActions.userLogout());
  }
}

//= =======================================
// LOGOUT


const apiLogout = () => axios.get('/api/auth/logout');

export function* logoutProcess() {
  try {
    yield call(apiLogout);

    yield put(userActions.userLogout());
  } catch (e) {
    console.log('login error', e);
  }
}


//= =======================================
// WATCHER

export function* watchUserRequest() {
  yield fork(
    takeEvery,
    userActions.USER_CHECKIN,
    checkinProcess,
  );
  yield fork(
    takeEvery,
    userActions.USER_REQUEST_LOGOUT,
    logoutProcess,
  );
}
