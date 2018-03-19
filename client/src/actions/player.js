export const PLAYER_PLAY_PAUSE = 'PLAYER_PLAY_PAUSE';
export const PLAYER_TOGGLE_LOOP = 'PLAYER_TOGGLE_LOOP';
export const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME';
export const PLAYER_TOGGLE_MUTE = 'PLAYER_TOGGLE_MUTE';
export const PLAYER_SET_SONG = 'PLAYER_SET_SONG';
export const PLAYER_SET_PLAYLIST = 'PLAYER_SET_PLAYLIST';
export const PLAYER_SET_DURATION = 'PLAYER_SET_DURATION';


export const playerPlayPause = () => ({
  type: PLAYER_PLAY_PAUSE,
});

export const playerToggleLoop = () => ({
  type: PLAYER_TOGGLE_LOOP,
});

export const playerSetVolume = volume => ({
  type: PLAYER_SET_VOLUME,
  volume,
});

export const playerToggleMute = () => ({
  type: PLAYER_TOGGLE_MUTE,
});

export const playerSetSong = song => ({
  type: PLAYER_SET_SONG,
  song,
});

export const playerSetPlaylist = playlist => ({
  type: PLAYER_SET_PLAYLIST,
  playlist,
});

export const playerSetDuration = duration => ({
  type: PLAYER_SET_DURATION,
  duration,
});

