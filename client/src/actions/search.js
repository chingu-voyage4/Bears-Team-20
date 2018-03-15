export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_FAILED = 'SEARCH_FAILED';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_INPUT_CHANGE = 'SEARCH_INPUT_CHANGE';


export const searchInputChange = input => ({
  type: SEARCH_INPUT_CHANGE,
  input,
});

export const searchRequest = input => ({
  type: SEARCH_REQUEST,
  input,
});

export const searchSuccess = results => ({
  type: SEARCH_SUCCESS,
  results,
});


export const searchFailed = errors => ({
  type: SEARCH_FAILED,
  errors,
});
