import {
  SEARCH_REQUEST,
  SEARCH_FAILED,
  SEARCH_SUCCESS,
  SEARCH_INPUT_CHANGE,
} from '../actions/search';

const initialState = {
  isFetching: false,
  input: '',
  results: [],
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_INPUT_CHANGE:
      return { ...state, input: action.input };

    case SEARCH_REQUEST:
      return { ...state, isFetching: true, errors: [] };

    case SEARCH_SUCCESS:
      return { ...state, isFetching: false, results: action.results };

    case SEARCH_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };

    default: return state;
  }
};
