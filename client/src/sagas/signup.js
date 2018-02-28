import { takeEvery, delay } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import axios from "axios";

import * as signupActions from "../actions/signup";
import * as userActions from "../actions/user";


function* signup_process(action) {
    try {
        const payload = yield call(
            postSignupToAPI,
            action.signupData
        );

        // Errors
        if(payload.data.errors){
            yield put(signupActions.signupFailed(payload.data.errors));
        }

        // User data
        if(payload.data.user){
            yield put(userActions.userLogin(payload.data.user));
            // REDIRECT??
        }

    } catch (e) {
        console.log(e);
    }
}

const postSignupToAPI = data => {

    let bodydata = JSON.stringify({
        email: data.email,
        password: data.password
    });

    return axios.post("/api/signup", bodydata);

};

export function* watchSignupRequest() {
    yield* takeEvery( signupActions.SIGNUP_REQUEST, signup_process );
}