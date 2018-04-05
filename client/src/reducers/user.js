import * as actions from '../actions/user';

const eraseSamplePlaylists = [
  {
    id: 'pl_1',
    title: 'playlistName 1',
    songs: [
      { title: 'Play1', id: 'song_1' },
      { title: 'Play2', id: 'song_2' },
      { title: 'Play3', id: 'song_3' },
    ],
  },
  {
    id: 'pl_2',
    title: 'playlistName 2',
    songs: [
      { title: 'Play4', id: 'song_4' },
      { title: 'Play5', id: 'song_5' },
      { title: 'Play6', id: 'song_6' },
    ],
  },
];


const initialState = {
  isAuthenticated: false,
  username: '',
  changePw: {
    isFetching: false,
    errors: [],
  },
  picture: {
    url: 'http://santetotal.com/wp-content/uploads/2014/05/default-user.png',
    isFetching: false,
    errors: [],
  },
  playlists: {
    data: eraseSamplePlaylists,
    isFetching: false,
    errors: [],
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        username: action.user.username,
        picture: {
          isFetching: false,
          errors: [],
          url: action.user.picture || initialState.picture.url, // defaults to generic image
        },
      };
    case actions.USER_LOGOUT:
      return {
        ...state, username: '', profilePic: '', isAuthenticated: false,
      };

    case actions.CHANGE_PW_REQUEST:
      return {
        ...state,
        changePw: {
          isFetching: true,
          errors: [],
        },
      };

    case actions.CHANGE_PW_SUCCESS:
      return {
        ...state,
        changePw: {
          isFetching: false,
          errors: [],
        },
      };

    case actions.CHANGE_PW_FAILED:
      return {
        ...state,
        changePw: {
          isFetching: false,
          errors: action.errors,
        },
      };

    case actions.CHANGE_PICTURE_REQUEST:
      return {
        ...state,
        picture: {
          ...state.picture,
          isFetching: true,
          errors: [],
        },
      };

    case actions.CHANGE_PICTURE_SUCCESS:
      return {
        ...state,
        picture: {
          url: action.url,
          isFetching: false,
          errors: [],
        },
      };

    case actions.CHANGE_PICTURE_FAILED:
      return {
        ...state,
        picture: {
          ...state.picture,
          isFetching: false,
          errors: action.errors,
        },
      };

    case actions.SET_PLAYLISTS_REQUEST:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          isFetching: true,
          errors: [],
        },
      };

    case actions.SET_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlists: {
          data: action.playlists,
          isFetching: false,
          errors: [],
        },
      };

    case actions.SET_PLAYLISTS_FAILED:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          isFetching: false,
          errors: action.errors,
        },
      };

    default: return state;
  }
};
