import * as actions from './login';



describe('login actions', ()=> {
    
    it('should return the right type and payload on loginRequest', () => {
        const loginData = {
            a:1, b: "asdasd", c: { d: ""}
        }
        expect(actions.loginRequest(loginData)).toEqual({
            type: 'LOGIN_REQUEST',
            loginData
        })
    })

    it('should return the right type and payload on loginFailed', () => {
        const errors = {
            a:1, b: "asdasd", c: { d: ""}
        }
        expect(actions.loginFailed(errors)).toEqual({
            type: 'LOGIN_FAILED',
            errors
        })
    })
})