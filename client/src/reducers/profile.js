import * as actions from '../actions/profile';

const initialState = {
  isFetching: false,
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.CHANGE_PW_REQUEST:
      return { ...state, isFetching: true, errors: [] };
    case actions.CHANGE_PW_SUCCESS:
      return { ...state, isFetching: false, errors: [] };

    case actions.CHANGE_PW_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };

    default: return state;
  }
};
