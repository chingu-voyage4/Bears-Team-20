import { fork, all } from 'redux-saga/effects';
import { watchLoginRequest } from './login';
import { watchSignupRequest } from './signup';
import { watchSearchRequest } from './search';

export default function* Root() {
  yield all([
    fork(watchLoginRequest),
    fork(watchSignupRequest),
    fork(watchSearchRequest),
  ]);
}
