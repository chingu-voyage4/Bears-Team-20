export const USER_LOGIN = 'USER_LOGIN';
export const USER_REQUEST_LOGOUT = 'USER_REQUEST_LOGOUT';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_CHECKIN = 'USER_CHECKIN';

export const CHANGE_PW_REQUEST = 'CHANGE_PW_REQUEST';
export const CHANGE_PW_FAILED = 'CHANGE_PW_FAILED';
export const CHANGE_PW_SUCCESS = 'CHANGE_PW_SUCCESS';

export const CHANGE_PICTURE_REQUEST = 'CHANGE_PICTURE_REQUEST';
export const CHANGE_PICTURE_FAILED = 'CHANGE_PICTURE_FAILED';
export const CHANGE_PICTURE_SUCCESS = 'CHANGE_PICTURE_SUCCESS';

export const SET_PLAYLISTS_REQUEST = 'SET_PLAYLISTS_REQUEST';
export const SET_PLAYLISTS_FAILED = 'SET_PLAYLISTS_FAILED';
export const SET_PLAYLISTS_SUCCESS = 'SET_PLAYLISTS_SUCCESS';
export const SET_PLAYLISTS_LOCALLY = 'SET_PLAYLISTS_LOCALLY';
export const ADD_PLAYLIST_LOCALLY = 'ADD_PLAYLIST_LOCALLY';
export const DELETE_PLAYLIST_LOCALLY = 'DELETE_PLAYLIST_LOCALLY';

export const ADD_TRACK_LOCALLY = 'ADD_TRACK_LOCALLY';


// for login or signup
export const userLogin = user => ({
  type: USER_LOGIN,
  user,
});

// for logout
export const userRequestLogout = () => ({
  type: USER_REQUEST_LOGOUT,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});


export const userCheckin = () => ({
  type: USER_CHECKIN,
});

// change pw
export const changePwRequest = changePwData => ({
  type: CHANGE_PW_REQUEST,
  changePwData,
});

export const changePwFailed = errors => ({
  type: CHANGE_PW_FAILED,
  errors,
});

export const changePwSuccess = () => ({
  type: CHANGE_PW_SUCCESS,
});

// change user's picture
export const changePictureRequest = url => ({
  type: CHANGE_PICTURE_REQUEST,
  url,
});

export const changePictureFailed = errors => ({
  type: CHANGE_PICTURE_FAILED,
  errors,
});

export const changePictureSuccess = url => ({
  type: CHANGE_PICTURE_SUCCESS,
  url,
});

// Playlists

export const addPlaylistLocally = () => ({
  type: ADD_PLAYLIST_LOCALLY,
});

export const deletePlaylistLocally = id => ({
  type: DELETE_PLAYLIST_LOCALLY,
  id,
});

export const setPlaylistsLocally = playlists => ({
  type: SET_PLAYLISTS_LOCALLY,
  playlists,
});

export const setPlaylistsRequest = playlists => ({
  type: SET_PLAYLISTS_REQUEST,
  playlists,
});

export const setPlaylistsFailed = errors => ({
  type: SET_PLAYLISTS_FAILED,
  errors,
});

export const setPlaylistsSuccess = playlists => ({
  type: SET_PLAYLISTS_SUCCESS,
  playlists,
});


export const addTrackToPlaylist = (track, playlist) => ({
  type: ADD_TRACK_LOCALLY,
  playlist,
  track,
});
