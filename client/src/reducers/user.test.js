import userReducer from './user';
import * as actions from '../actions/user';



const initialState = {
    isAuthenticated: false,
    email: '',
};

describe('user reducer', () => {
    
    let state;

    beforeEach(() => {
        state = initialState;
    }) 

    it('should return the same state if invalid action type', () => {
        expect(userReducer(state, { type: 'INVALID ACTION' })).toEqual(state);
    })

    it('should set isAuthenticated and email on USER_LOGIN', () => {
        const user = { email: "asda@test.com" };
        expect(userReducer(state, actions.userLogin(user))).toEqual({
            ...state,
            email: user.email, 
            isAuthenticated: true
        });
    })

    it('should set isAuthenticated to false and blank email on USER_LOGOUT', () => {
        expect(userReducer(state, actions.userLogout())).toEqual({
            ...state,
            email: '',
            isAuthenticated: false
        });
    })
})