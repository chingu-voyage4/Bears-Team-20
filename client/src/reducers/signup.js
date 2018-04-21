import {
  SIGNUP_REQUEST,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
} from '../actions/signup';

const initialState = {
  isFetching: false,
  pause: false,
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, isFetching: true, errors: [] };
    case SIGNUP_SUCCESS:
      return { ...state, isFetching: false, errors: [] };

    case SIGNUP_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
        pause: true,
      };

    default:
      return state;
  }
};
