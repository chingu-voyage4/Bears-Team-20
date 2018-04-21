import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as loginActions from '../actions/login';
import * as userActions from '../actions/user';


const postLoginToAPI = data => axios.post('/api/auth/login', {
  email: data.email,
  password: data.password,
});

export function* loginProcess(action) {
  try {
    const payload = yield call(
      postLoginToAPI,
      action.loginData,
    );

    // Errors
    if (payload.data.errors) {
      yield put(loginActions.loginFailed(payload.data.errors));
    }

    // User data
    if (payload.data) {
      yield put(userActions.userLogin(payload.data));
      yield put(loginActions.loginSuccess());
    }
  } catch (e) {
    console.log('login error', e);
    yield put(loginActions.loginFailed({
      request: e.message,
    }));
  }
}


export function* watchLoginRequest() {
  yield fork(
    takeEvery,
    loginActions.LOGIN_REQUEST,
    loginProcess,
  );
}
