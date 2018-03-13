import searchReducer from './search';
import * as actions from '../actions/search';


const initialState = {
    isFetching: false,
    input: '',
    results: [],
    errors: [],
};

describe('search reducer', () => {
    
    let state;

    beforeEach(() => {
        state = initialState;
    }) 

    it('should return the same state if invalid action type', () => {
        expect(searchReducer(state, { type: 'INVALID ACTION' })).toEqual(state);
    })

    it('should set isFetching to true on SEARCH_REQUEST', () => {
        expect(searchReducer(state, actions.searchRequest({}))).toEqual({
            ...state,
            isFetching: true
        });
    })

    it('should set results on SEARCH_SUCCESS', () => {
        const mockResults = [ "asd", "asdasdq", "asdasdqwe"];
        expect(searchReducer(state, actions.searchSuccess(mockResults))).toEqual({
            ...state,
            results: mockResults
        });
    })

    it('should set errors on SEARCH_FAILED', () => {
        const errors = [
            {
                type: "my error type",
                message: "asdasdad"
            }
        ]
        expect(searchReducer(state, actions.searchFailed(errors))).toEqual({
            ...state,
            errors
        });
    })
})