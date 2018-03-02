import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import * as signupActions from '../actions/signup';
import * as userActions from '../actions/user';


const postSignupToAPI = (data) => {
  const bodydata = JSON.stringify({
    email: data.email,
    password: data.password,
  });

  return axios.post('/api/signup', bodydata);
};

function* signupProcess(action) {
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
    yield put(signupActions.signupFailed(e.message));
  }
}

export default function* watchSignupRequest() {
  yield takeEvery(signupActions.SIGNUP_REQUEST, signupProcess);
}
