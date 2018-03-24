import { fork, all } from 'redux-saga/effects';
import { watchLoginRequest } from './login';
import { watchUserRequest } from './user';
import { watchSignupRequest } from './signup';
import { watchSearchRequest } from './search';

export default function* Root() {
  yield all([
    fork(watchUserRequest),
    fork(watchLoginRequest),
    fork(watchSignupRequest),
    fork(watchSearchRequest),
  ]);
}
