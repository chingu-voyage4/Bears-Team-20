import * as actions from './profile';



describe('profile actions', ()=> {
    
    it('should return the right type and payload on changePwRequest', () => {
        const changePwData = {
            currentPassword: "asdasd",
            nextPassword: "qqqqqq",
            repeatPassword: "qjnsakjnzxc"
        }
        expect(actions.changePwRequest(changePwData)).toEqual({
            type: 'CHANGE_PW_REQUEST',
            changePwData
        })
    })

    it('should return the right type and payload on changePwFailed', () => {
        const errors = [
            {
                type: "errorType", 
                message: "asdasd"
            }
        ]
        expect(actions.changePwFailed(errors)).toEqual({
            type: 'CHANGE_PW_FAILED',
            errors
        })
    })


    it('should return the right type on changePwSuccess', () => {
        expect(actions.changePwSuccess()).toEqual({
            type: 'CHANGE_PW_SUCCESS'
        })
    })
})