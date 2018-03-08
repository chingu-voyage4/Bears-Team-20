import loginReducer from './login';
import * as actions from '../actions/login';


const initialState = {
    isFetching: false,
    pause: false,
    errors: [],
};
  

describe('login reducer', () => {
    
    let state;

    beforeEach(() => {
        state = initialState;
    }) 

    it('should return the same state if invalid action type', () => {
        expect(loginReducer(state, { type: 'INVALID ACTION' })).toEqual(state);
    })

    it('should set isFetching to true on LOGIN_REQUEST', () => {
        expect(loginReducer(state, actions.loginRequest({}))).toEqual({
            ...state,
            isFetching: true
        });
    })

    it('should set errors and pause on LOGIN_FAILED', () => {
        const errors = [
            {
                type: "my error type",
                message: "asdasdad"
            }
        ]
        expect(loginReducer(state, actions.loginFailed(errors))).toEqual({
            ...state,
            pause: true,
            errors
        });
    })
})