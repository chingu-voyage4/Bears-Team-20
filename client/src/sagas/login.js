import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import * as loginActions from '../actions/login';
import * as userActions from '../actions/user';


const postLoginToAPI = (data) => {
  const bodydata = JSON.stringify({
    email: data.email,
    password: data.password,
  });

  return axios.post('/api/login', bodydata);
};

function* loginProcess(action) {
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
    if (payload.data.user) {
      yield put(userActions.userLogin(payload.data.user));
    }
  } catch (e) {
    yield put(loginActions.loginFailed(e.message));
  }
}

export default function* watchLoginRequest() {
  yield takeEvery(loginActions.LOGIN_REQUEST, loginProcess);
}
