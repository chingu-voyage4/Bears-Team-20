export const CHANGE_PW_REQUEST = 'CHANGE_PW_REQUEST';
export const CHANGE_PW_FAILED = 'CHANGE_PW_FAILED';
export const CHANGE_PW_SUCCESS = 'CHANGE_PW_SUCCESS';


export const changePwRequest = changePwData => ({
  type: CHANGE_PW_REQUEST,
  changePwData,
});

export const changePwFailed = errors => ({
  type: CHANGE_PW_FAILED,
  errors,
});


export const changePwSuccess = () => ({
  type: CHANGE_PW_SUCCESS,
});
