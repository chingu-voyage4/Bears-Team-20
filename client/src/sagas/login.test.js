import { watchLoginRequest, login_process } from './login';
import * as actions from '../actions/login';
import { takeEvery, fork } from 'redux-saga/effects';



describe('Login saga stuff', () => {

    it('should trigger on LOGIN_REQUEST', () => {
        const watchTask = watchLoginRequest();
        expect( JSON.stringify(watchTask.next().value) ).toEqual(
            JSON.stringify( takeEvery( actions.LOGIN_REQUEST, login_process ) )
        );
    })

    it('should try to get the payload with the loginData provided', () => {
        const loginData = {
            email: "test@email.com",
            password: "asd123"
        }
        const gen = login_process({ loginData });
        expect(gen.next().value.CALL.args).toEqual([loginData]);
    } )

    it('should trigger user login action on success', () => {
        
    })

    it('should trigger login failed action on fail', () => {
        
    })

    it('should handle errors correctly', () => {

    })
})