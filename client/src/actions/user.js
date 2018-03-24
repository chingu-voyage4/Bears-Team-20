export const USER_LOGIN = 'USER_LOGIN';
export const USER_REQUEST_LOGOUT = 'USER_REQUEST_LOGOUT';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_CHECKIN = 'USER_CHECKIN';

// for login or signup
export const userLogin = user => ({
  type: USER_LOGIN,
  user,
});

// for logout
export const userRequestLogout = () => ({
  type: USER_REQUEST_LOGOUT,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});


export const userCheckin = () => ({
  type: USER_CHECKIN,
});
