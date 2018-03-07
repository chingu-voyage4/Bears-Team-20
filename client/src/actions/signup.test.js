import * as actions from './signup';



describe('signup actions', ()=> {
    
    it('should return the right type and payload on signupRequest', () => {
        const signupData = {
            a:1, b: "asdasd", c: { d: ""}
        }
        expect(actions.signupRequest(signupData)).toEqual({
            type: 'SIGNUP_REQUEST',
            signupData
        })
    })

    it('should return the right type and payload on signupFailed', () => {
        const errors = [
            {
                type: "errorType", 
                message: "asdasd"
            }
        ]
        expect(actions.signupFailed(errors)).toEqual({
            type: 'SIGNUP_FAILED',
            errors
        })
    })
})