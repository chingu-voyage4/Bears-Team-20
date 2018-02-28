import {
    USER_LOGIN,
    USER_LOGOUT
} from "../actions/user";

const initialState = {
    isAuthenticated: false,
    email: ""
};

export default (state=initialState, action={}) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, email: action.user.email , isAuthenticated: true };
        case USER_LOGOUT:
            return {  ...state, email: "", isAuthenticated: false };
        default: return state;
    }
};