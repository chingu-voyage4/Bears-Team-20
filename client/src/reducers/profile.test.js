import profileReducer from './profile';
import * as actions from '../actions/profile';


const initialState = {
    isFetching: false,
    errors: [],
};
  

describe('profile reducer', () => {
    
    let state;

    beforeEach(() => {
        state = initialState;
    }) 

    it('should return the same state if invalid action type', () => {
        expect(profileReducer(state, { type: 'INVALID ACTION' })).toEqual(state);
    })

    it('should set isFetching to true on CHANGE_PW_REQUEST', () => {
        expect(profileReducer(state, actions.changePwRequest())).toEqual({
            ...state,
            isFetching: true
        });
    })

    it('should set isFetching to true on CHANGE_PW_SUCCESS', () => {
        expect(profileReducer(state, actions.changePwSuccess())).toEqual({
            ...state,
            isFetching: false
        });
    })


    it('should set errors and pause on CHANGE_PW_FAILED', () => {
        const errors = [
            {
                type: "my error type",
                message: "asdasdad"
            }
        ]
        expect(profileReducer(state, actions.changePwFailed(errors))).toEqual({
            ...state,
            errors
        });
    })
})