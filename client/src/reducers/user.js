import {
  USER_LOGIN,
  USER_LOGOUT,
} from '../actions/user';

const initialState = {
  isAuthenticated: false,
  username: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        username: action.user.username,
        isAuthenticated: true,
      };
    case USER_LOGOUT:
      return { ...state, username: '', isAuthenticated: false };
    default: return state;
  }
};
