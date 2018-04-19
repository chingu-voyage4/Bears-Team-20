import userReducer from './user';
import { initialState } from './user'
import * as actions from '../actions/user';



describe('user reducer', () => {
    
    let state;

    beforeEach(() => {
        state = initialState;
    }) 

    it('should return the same state if invalid action type', () => {
        expect(userReducer(state, { type: 'INVALID ACTION' })).toEqual(state);
    })

    it('should set isAuthenticated and username on USER_LOGIN', () => {
        const user = { username: "asda@test.com", picture: 'http.com.ar', playlists: [] };
        expect(userReducer(state, actions.userLogin(user))).toEqual({
            ...state,
            username: user.username, 
            picture: {
                url: user.picture,
                isFetching: false,
                errors: []
            },
            playlists: {
                data: user.playlists,
                isFetching: false,
                errors: []
            },
            isAuthenticated: true
        });
    })

    it('should set isAuthenticated to false and blank username on USER_LOGOUT', () => {
        expect(userReducer(state, actions.userLogout())).toEqual(initialState);
    })
})