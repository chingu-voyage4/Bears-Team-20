export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

// for login or signup
export const userLogin = (user) => ({
    type: USER_LOGIN,
    user
});

// for logout
export const userLogout = () => ({
    type: USER_LOGOUT
});