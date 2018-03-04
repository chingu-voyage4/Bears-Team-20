import { watchLoginRequest, login_process } from './login';
import * as actions from '../actions/login';
import { takeEvery, fork } from 'redux-saga/effects';



describe('Login saga stuff', () => {
    it('should trigger on LOGIN_REQUEST', () => {
        const gen = watchLoginRequest();
        expect( gen.next().value ).toEqual(
            fork(login_process, actions.LOGIN_REQUEST )
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
})