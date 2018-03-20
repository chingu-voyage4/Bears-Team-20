import * as actions from './player';



describe('player actions', ()=> {
    
    it('should return the correct payload on playerSetReady', () => {
        let mockReady = true;
        expect(actions.playerSetReady(mockReady)).toEqual({
            type: actions.PLAYER_READY,
            isReady: mockReady
        })
        mockReady = false;
        expect(actions.playerSetReady(mockReady)).toEqual({
            type: actions.PLAYER_READY,
            isReady: mockReady
        })
    })

    it('should return the correct type on playerPlayPause', () => {
        expect(actions.playerPlayPause()).toEqual({
            type: actions.PLAYER_PLAY_PAUSE
        })
    })

    it('should return the correct type on playerSetPlay', () => {
        expect(actions.playerSetPlay()).toEqual({
            type: actions.PLAYER_PLAY
        })
    })

    it('should return the correct type on playerSetPause', () => {
        expect(actions.playerSetPause()).toEqual({
            type: actions.PLAYER_PAUSE
        })
    })

    it('should return the correct type on playerToggleLoop', () => {
        expect(actions.playerToggleLoop()).toEqual({
            type: actions.PLAYER_TOGGLE_LOOP
        })
    })
})