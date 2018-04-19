import playerReducer from './player';
import * as actions from '../actions/player';


let initialState = {
    isReady: false,
    isPlaying: false,
    isLooping: false,
    volume: 1,
    isMuted: false,
    currentSong: {},
    currentPlaylist: [],
  
    duration: 0,
    progress: 0,
};
  

describe('player reducer', () => {
    
    let state;

    beforeEach(() => {
        state = initialState;
    }) 

    it('should return the same state if invalid action type', () => {
        expect(playerReducer(state, { type: 'INVALID ACTION' })).toEqual(state);
    })

    it('should set isReady to true on PLAYER_READY', () => {
        let mockReady = true;
        expect(playerReducer(state, actions.playerSetReady(mockReady))).toEqual({
            ...state,
            isReady: mockReady
        });
        mockReady = false;
        expect(playerReducer(state, actions.playerSetReady(mockReady))).toEqual({
            ...state,
            isReady: mockReady
        });
    })

    it('should toogle isPlaying on PLAYER_PLAY_PAUSE', () => {
        const state = {
            ...initialState,
            currentSong: {
                name: "asdasd"
            }
        };
        const initialIsPlaying = state.isPlaying;

        expect(playerReducer(state, actions.playerPlayPause())).toEqual({
            ...state,
            isPlaying: !initialIsPlaying
        });

        const newState = playerReducer(state, actions.playerPlayPause());
        expect(playerReducer(newState, actions.playerPlayPause())).toEqual({
            ...state,
            isPlaying: !!initialIsPlaying
        });
    })

    it('should set isPlaying to true on PLAYER_PLAY', () => {
        expect(playerReducer(state, actions.playerSetPlay())).toEqual({
            ...state,
            isPlaying: true
        });
    })

    it('should set isPlaying to false on PLAYER_PAUSE', () => {
        expect(playerReducer(state, actions.playerSetPause())).toEqual({
            ...state,
            isPlaying: false
        });
    })

    it('should toogle isLooping on PLAYER_TOGGLE_LOOP', () => {
        const initialIsLooping = state.isLooping;

        expect(playerReducer(state, actions.playerToggleLoop())).toEqual({
            ...state,
            isLooping: !initialIsLooping
        });

        const newState = playerReducer(state, actions.playerToggleLoop());
        expect(playerReducer(newState, actions.playerToggleLoop())).toEqual({
            ...state,
            isLooping: !!initialIsLooping
        });
    })

    it('should set volume on PLAYER_SET_VOLUME', () => {
        let mockVolume = 32;
        expect(playerReducer(state, actions.playerSetVolume(mockVolume))).toEqual({
            ...state,
            volume: mockVolume
        });
        mockVolume = 54;
        expect(playerReducer(state, actions.playerSetVolume(mockVolume))).toEqual({
            ...state,
            volume: mockVolume
        });
    })

    it('should toogle isLooping on PLAYER_TOGGLE_MUTE', () => {
        const initialIsMuted = state.isMuted;

        expect(playerReducer(state, actions.playerToggleMute())).toEqual({
            ...state,
            isMuted: !initialIsMuted
        });

        const newState = playerReducer(state, actions.playerToggleMute());
        expect(playerReducer(newState, actions.playerToggleMute())).toEqual({
            ...state,
            isMuted: !!initialIsMuted
        });
    })

    it('should set song on PLAYER_SET_SONG', () => {
        let mockSong = {
            title: "asdas",
            link: "www.google.com.ru.jp.pj"
        };
        expect(playerReducer(state, actions.playerSetSong(mockSong))).toEqual({
            ...state,
            currentSong: mockSong
        });
        mockSong = {
            title: "qweasdasdasd",
            link: "www.yandex.com.ru.jp.pj"
        };;
        expect(playerReducer(state, actions.playerSetSong(mockSong))).toEqual({
            ...state,
            currentSong: mockSong
        });
    })

    it('should set song and isPlaying on PLAYER_PLAY_SONG', () => {
        let mockSong = {
            title: "asdas",
            link: "www.bing.com.ru.jp.pj"
        };
        expect(playerReducer(state, actions.playerPlaySong(mockSong))).toEqual({
            ...state,
            currentSong: mockSong,
            isPlaying: true,
        });
        mockSong = {
            title: "asdas",
            link: "www.yahoo.com.ru.jp.pj"
        };
        expect(playerReducer(state, actions.playerPlaySong(mockSong))).toEqual({
            ...state,
            currentSong: mockSong,
            isPlaying: true
        });
    })

    it('should set song on PLAYER_SET_PLAYLIST', () => {
        let mockPlaylist = [
            {
                title: "asdas",
                link: "www.google.com.ru.jp.pj"
            }
        ];
        expect(playerReducer(state, actions.playerSetPlaylist(mockPlaylist))).toEqual({
            ...state,
            currentPlaylist: mockPlaylist
        });
        mockPlaylist = [
            {
                title: "qweasdasdasd",
                link: "www.yandex.com.ru.jp.pj"
            }
        ];
        expect(playerReducer(state, actions.playerSetPlaylist(mockPlaylist))).toEqual({
            ...state,
            currentPlaylist: mockPlaylist
        });
    })

    it('should set song on PLAYER_SET_DURATION', () => {
        let mockDuration = 112;
        expect(playerReducer(state, actions.playerSetDuration(mockDuration))).toEqual({
            ...state,
            duration: mockDuration
        });
        mockDuration = 1241;
        expect(playerReducer(state, actions.playerSetDuration(mockDuration))).toEqual({
            ...state,
            duration: mockDuration
        });
    })

    it('should set song on PLAYER_SET_PROGRESS', () => {
        let mockProgress = 112;
        expect(playerReducer(state, actions.playerSetProgress(mockProgress))).toEqual({
            ...state,
            progress: mockProgress
        });
        mockProgress = 1241;
        expect(playerReducer(state, actions.playerSetProgress(mockProgress))).toEqual({
            ...state,
            progress: mockProgress
        });
    })

    it('should set song on PLAYER_SET_PLAYLIST_SHOW', () => {
        let mockPlShowing = true;
        expect(playerReducer(state, actions.playerSetPlaylistShow(mockPlShowing))).toEqual({
            ...state,
            plShowing: mockPlShowing
        });
        mockPlShowing = false;
        expect(playerReducer(state, actions.playerSetPlaylistShow(mockPlShowing))).toEqual({
            ...state,
            plShowing: mockPlShowing
        });
    })
})