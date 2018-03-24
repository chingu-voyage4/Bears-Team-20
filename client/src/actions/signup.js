export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';


export const signupRequest = signupData => ({
  type: SIGNUP_REQUEST,
  signupData,
});

export const signupFailed = errors => ({
  type: SIGNUP_FAILED,
  errors,
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});
