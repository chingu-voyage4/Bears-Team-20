import { fork } from "redux-saga/effects";
import { watchLoginRequest } from "./login";
import { watchSignupRequest } from "./signup";

export default function* Root() {
    yield [
        fork(watchLoginRequest),
        fork(watchSignupRequest)
    ];
}