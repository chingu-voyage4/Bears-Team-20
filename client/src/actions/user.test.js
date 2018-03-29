import * as actions from './user';



describe('user actions', ()=> {
    
    it('should return the right type and payload on userLogin', () => {
        const user = {
            a:1, b: "asdasd", c: { d: ""}
        }
        expect(actions.userLogin(user)).toEqual({
            type: 'USER_LOGIN',
            user
        })
    })

    it('should return the right type and payload on userLogout', () => {
        expect(actions.userLogout()).toEqual({
            type: 'USER_LOGOUT',
        })
    })

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



    
    it('should return the right type and payload on changePictureRequest', () => {
        const newUrl = "HTTP:::NEW::URL"
        expect(actions.changePictureRequest(newUrl)).toEqual({
            type: 'CHANGE_PICTURE_REQUEST',
            url: newUrl
        })
    })

    it('should return the right type and payload on changePictureFailed', () => {
        const errors = [
            {
                type: "errorType", 
                message: "asdasd"
            }
        ]
        expect(actions.changePictureFailed(errors)).toEqual({
            type: 'CHANGE_PICTURE_FAILED',
            errors
        })
    })


    it('should return the right type on changePictureSuccess', () => {
        expect(actions.changePictureSuccess()).toEqual({
            type: 'CHANGE_PICTURE_SUCCESS'
        })
    })



})