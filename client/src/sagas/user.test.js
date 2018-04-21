import { changePwProcess, watchUserRequest } from './user';
import * as actions from '../actions/user';
import { takeEvery, fork } from 'redux-saga/effects';



describe('User saga stuff', () => {

    it('should try to get the payload with the changePwData provided', () => {
        const changePwData = {
            currentPassword: "data.currentPassword",
            nextPassword: "data.nextPassword",
            repeatPassword: "data.repeatPassword"
        }
        const gen = changePwProcess({ changePwData });
        expect(gen.next().value.CALL.args).toEqual([changePwData]);
    } )

    it('should trigger user login action on success', () => {
        
    })

    it('should trigger login failed action on fail', () => {
        
    })

    it('should handle errors correctly', () => {

    })
})