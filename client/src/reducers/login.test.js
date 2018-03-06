import loginReducer from './login';
import * as actions from '../actions/login';


const initialState = {
    isFetching: false,
    pause: false,
    errors: {},
};
  

describe('login reducer', () => {
    
    let state;

    beforeEach(() => {
        state = {
          isFetching: false,
          pause: false,
          errors: {},
        };
        
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
        const errors = {
            a: "asd", b: 3, c: 312.3
        }
        expect(loginReducer(state, actions.loginFailed(errors))).toEqual({
            ...state,
            pause: true,
            errors
        });
    })
})