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

    it('should return the correct type on playerSetVolume', () => {
        const mockVolume = 1;
        expect(actions.playerSetVolume(mockVolume)).toEqual({
            type: actions.PLAYER_SET_VOLUME,
            volume: mockVolume
        })
    })

    it('should return the correct type on playerToggleMute', () => {
        expect(actions.playerToggleMute()).toEqual({
            type: actions.PLAYER_TOGGLE_MUTE
        })
    })

    it('should return the correct type on playerPlaySong', () => {
        const mockSong = {
            title: "asdasd",
            link: "aaaaaa.om"
        };
        expect(actions.playerPlaySong(mockSong)).toEqual({
            type: actions.PLAYER_PLAY_SONG,
            song: mockSong
        })
    })

    it('should return the correct type on playerSetSong', () => {
        const mockSong = {
            title: "asdasd",
            link: "aaaaaa.om"
        };
        expect(actions.playerSetSong(mockSong)).toEqual({
            type: actions.PLAYER_SET_SONG,
            song: mockSong
        })
    })

    it('should return the correct type on playerSetPlaylist', () => {
        const mockPlaylist = [
            {
                title: "asdasd",
                link: "aaaaaa.om"
            }
        ]
        expect(actions.playerSetPlaylist(mockPlaylist)).toEqual({
            type: actions.PLAYER_SET_PLAYLIST,
            playlist: mockPlaylist
        })
    })

    it('should return the correct type on playerSetDuration', () => {
        const mockDuration = 111;
        expect(actions.playerSetDuration(mockDuration)).toEqual({
            type: actions.PLAYER_SET_DURATION,
            duration: mockDuration
        })
    })

    it('should return the correct type on playerSetProgress', () => {
        const mockProgress = 32;
        expect(actions.playerSetProgress(mockProgress)).toEqual({
            type: actions.PLAYER_SET_PROGRESS,
            progress: mockProgress
        })
    })
})