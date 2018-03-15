import * as actions from './search';



describe('search actions', ()=> {
    
    it('should return the right type and payload on searchRequest', () => {
        const input = "asdasd";
        expect(actions.searchRequest(input)).toEqual({
            type: 'SEARCH_REQUEST',
            input
        })
    })

    it('should return the right type and payload on searchSuccess', () => {
        const results = [ "aqweq", "resultssss" ];
        expect(actions.searchSuccess(results)).toEqual({
            type: 'SEARCH_SUCCESS',
            results
        })
    })

    it('should return the right type and payload on searchFailed', () => {
        const errors = [
            {
                type: "errorType", 
                message: "asdasd"
            }
        ]
        expect(actions.searchFailed(errors)).toEqual({
            type: 'SEARCH_FAILED',
            errors
        })
    })
})