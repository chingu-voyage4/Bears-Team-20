import { call, put, takeEvery, fork } from "redux-saga/effects";
import axios from "axios";

import * as loginActions from "../actions/login";
import * as userActions from "../actions/user";


export function* login_process(action) {
    try {
        const payload = yield call(
            postLoginToAPI,
            action.loginData
        );

        // Errors
        if(payload.data.errors){
            yield put(loginActions.loginFailed(payload.data.errors));
        }

        // User data
        if(payload.data.user){
            yield put(userActions.userLogin(payload.data.user));
        }
    } catch (e) {
        console.log("login error", e);
        yield put(loginActions.loginFailed({
            request: e.message
        }));
    }
}


const postLoginToAPI = data => {
    return axios.post("/api/login", {
        email: data.email,
        password: data.password
    });
};

export function* watchLoginRequest() {
    yield fork(
        takeEvery,
        loginActions.LOGIN_REQUEST,
        login_process
    );
}