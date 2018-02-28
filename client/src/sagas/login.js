import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import * as loginActions from "../actions/login";
import * as userActions from "../actions/user";


function* login_process(action) {
    console.log("LOGIN IN!!!", action);
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
        yield put(loginActions.loginFailed(e.message));
    }
}


const postLoginToAPI = data => {
    let bodydata = JSON.stringify({
        email: data.email,
        password: data.password
    });

    return axios.post("/api/login", bodydata);
};

export function* watchLoginRequest() {
    yield takeEvery( loginActions.LOGIN_REQUEST, login_process );
}