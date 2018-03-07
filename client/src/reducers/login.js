import {
  LOGIN_REQUEST,
  LOGIN_FAILED,
} from '../actions/login';

const initialState = {
  isFetching: false,
  pause: false,
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true, errors: [] };

    case LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
        pause: true,
      };

    default: return state;
  }
};
