import * as actions from '../actions/user';

const initialState = {
  isAuthenticated: false,
  username: '',
  profilePic: '',
  changePw: {
    isFetching: false,
    errors: [],
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        username: action.user.username,
        profilePic: action.user.profilePic,
        isAuthenticated: true,
      };
    case actions.USER_LOGOUT:
      return {
        ...state, username: '', profilePic: '', isAuthenticated: false,
      };

    case actions.CHANGE_PW_REQUEST:
      return {
        ...state,
        changePw: {
          isFetching: true,
          errors: [],
        },
      };

    case actions.CHANGE_PW_SUCCESS:
      return {
        ...state,
        changePw: {
          isFetching: false,
          errors: [],
        },
      };

    case actions.CHANGE_PW_FAILED:
      return {
        ...state,
        changePw: {
          isFetching: false,
          errors: action.errors,
        },
      };

    default: return state;
  }
};
