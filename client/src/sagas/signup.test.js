import { watchSignupRequest, signupProcess } from './signup';
import * as actions from '../actions/signup';
import { takeEvery, fork } from 'redux-saga/effects';



describe('Signup saga stuff', () => {

    it('should trigger on SIGNUP_REQUEST', () => {
        const watchTask = watchSignupRequest();
        expect( JSON.stringify(watchTask.next().value) ).toEqual(
            JSON.stringify( takeEvery( actions.SIGNUP_REQUEST, signupProcess ) )
        );
    })

    it('should try to get the payload with the signupData provided', () => {
        const signupData = {
            username: "testUsername",
            email: "test@email.com",
            password: "asd123"
        }
        const gen = signupProcess({ signupData });
        expect(gen.next().value.CALL.args).toEqual([signupData]);
    } )

    it('should trigger user signup action on success', () => {
        
    })

    it('should trigger signup failed action on fail', () => {
        
    })

    it('should handle errors correctly', () => {

    })
})