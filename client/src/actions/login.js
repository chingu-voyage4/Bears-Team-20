export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


export const loginRequest = loginData => ({
  type: LOGIN_REQUEST,
  loginData,
});

export const loginFailed = errors => ({
  type: LOGIN_FAILED,
  errors,
});


export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});
