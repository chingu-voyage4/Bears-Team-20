import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as signupActions from '../actions/signup';
import * as userActions from '../actions/user';


const postSignupToAPI = data => axios.post('/api/signup', {
  username: data.username,
  email: data.email,
  password: data.password,
});


export function* signupProcess(action) {
  try {
    const payload = yield call(
      postSignupToAPI,
      action.signupData,
    );

    // Errors
    if (payload.data.errors) {
      yield put(signupActions.signupFailed(payload.data.errors));
    }

    // User data
    if (payload.data.user) {
      yield put(userActions.userLogin(payload.data.user));
      // REDIRECT??
    }
  } catch (e) {
    console.log(e);
    yield put(signupActions.signupFailed({
      request: e.message,
    }));
  }
}

export function* watchSignupRequest() {
  yield fork(
    takeEvery,
    signupActions.SIGNUP_REQUEST,
    signupProcess,
  );
}
