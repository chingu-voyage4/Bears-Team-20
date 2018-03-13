import { searchProcess, watchSearchRequest } from './search';
import * as actions from '../actions/search';
import { takeEvery, fork } from 'redux-saga/effects';



describe('Search saga stuff', () => {

    it('should trigger on SEARCH_REQUEST', () => {
        const watchTask = watchSearchRequest();
        expect( JSON.stringify(watchTask.next().value) ).toEqual(
            JSON.stringify( takeEvery( actions.SEARCH_REQUEST, searchProcess ) )
        );
    })

    it('should try to get the payload with the loginData provided', () => {
        const input = "SEARCHING my favorite song"
        const gen = searchProcess({ input });
        expect(gen.next().value.CALL.args).toEqual([input]);
    } )

    it('should trigger search success action on success', () => {
        const input = "SEARCHING my favorite song"
        const gen = searchProcess({ input });

        const mockPayload = { results: [ 'A', 'B' ] };

        // Call api
        gen.next();
        // Mock the api response without errors
        const callbackCalled = gen.next({
            data: mockPayload
        });
        expect(callbackCalled.value.PUT.action).toEqual(actions.searchSuccess(mockPayload))
        
    })

    it('should trigger login failed action on fail', () => {
        const input = "SEARCHING my favorite song"
        const gen = searchProcess({ input });

        const mockErrors = [ { type: "lala", message: "lolo" }]

        // Call api
        gen.next();
        // Mock the api response with errors
        const callbackCalled = gen.next({
            data: {
                errors: mockErrors
            }
        });
        expect(callbackCalled.value.PUT.action).toEqual(actions.searchFailed(mockErrors))
    })

    it('should handle errors correctly', () => {
        const input = "SEARCHING my favorite song"
        const gen = searchProcess({ input });

        const errorInstance = Error('some obscure error');

        // Generate Error instance inside generator
        gen.next();
        const callbackCalled = gen.throw(errorInstance);
        expect(callbackCalled.value.PUT.action).toEqual(actions.searchFailed([
            {
                type: 'request',
                message: errorInstance.message
            }
        ]))
    })
})