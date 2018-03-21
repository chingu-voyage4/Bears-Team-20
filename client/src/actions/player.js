export const PLAYER_READY = 'PLAYER_READY';
export const PLAYER_PLAY_PAUSE = 'PLAYER_PLAY_PAUSE';
export const PLAYER_PLAY = 'PLAYER_PLAY';
export const PLAYER_PAUSE = 'PLAYER_PAUSE';
export const PLAYER_TOGGLE_LOOP = 'PLAYER_TOGGLE_LOOP';
export const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME';
export const PLAYER_TOGGLE_MUTE = 'PLAYER_TOGGLE_MUTE';
export const PLAYER_SET_SONG = 'PLAYER_SET_SONG';
export const PLAYER_PLAY_SONG = 'PLAYER_PLAY_SONG';
export const PLAYER_SET_PLAYLIST = 'PLAYER_SET_PLAYLIST';
export const PLAYER_SET_DURATION = 'PLAYER_SET_DURATION';
export const PLAYER_SET_PROGRESS = 'PLAYER_SET_PROGRESS';
export const PLAYER_SET_PLAYLIST_SHOW = 'PLAYER_SET_PLAYLIST_SHOW';


export const playerSetReady = isReady => ({
  type: PLAYER_READY,
  isReady,
});

export const playerPlayPause = () => ({
  type: PLAYER_PLAY_PAUSE,
});

export const playerSetPlay = () => ({
  type: PLAYER_PLAY,
});

export const playerSetPause = () => ({
  type: PLAYER_PAUSE,
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


export const playerPlaySong = song => ({
  type: PLAYER_PLAY_SONG,
  song,
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

export const playerSetProgress = progress => ({
  type: PLAYER_SET_PROGRESS,
  progress,
});

export const playerSetPlaylistShow = plShowing => ({
  type: PLAYER_SET_PLAYLIST_SHOW,
  plShowing,
});

