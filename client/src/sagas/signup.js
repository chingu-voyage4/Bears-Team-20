import { call, put, takeEvery } from "redux-saga/effects";
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
        yield put(signupActions.signupFailed(e.message));
    }
}

const postSignupToAPI = data => {
    
    return axios.post("/api/signup", {
        username: data.username,
        email: data.email,
        password: data.password
    });

};

export function* watchSignupRequest() {
    yield takeEvery( signupActions.SIGNUP_REQUEST, signup_process );
}