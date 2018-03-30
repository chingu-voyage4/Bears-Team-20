import * as actions from '../actions/user';

const initialState = {
  isAuthenticated: false,
  username: '',
  changePw: {
    isFetching: false,
    errors: [],
  },
  picture: {
    url: 'http://santetotal.com/wp-content/uploads/2014/05/default-user.png',
    isFetching: false,
    errors: [],
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        username: action.user.username,
        picture: {
          isFetching: false,
          errors: [],
          url: action.user.picture || initialState.picture.url, // defaults to generic image
        },
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

    case actions.CHANGE_PICTURE_REQUEST:
      return {
        ...state,
        picture: {
          ...state.picture,
          isFetching: true,
          errors: [],
        },
      };

    case actions.CHANGE_PICTURE_SUCCESS:
      return {
        ...state,
        picture: {
          url: action.url,
          isFetching: false,
          errors: [],
        },
      };

    case actions.CHANGE_PICTURE_FAILED:
      return {
        ...state,
        picture: {
          ...state.picture,
          isFetching: false,
          errors: action.errors,
        },
      };

    default: return state;
  }
};
