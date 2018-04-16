/* eslint-disable no-underscore-dangle */
import * as actions from '../actions/user';

/*
const eraseSamplePlaylists = [
  {
    _id: 'pl_1',
    name: 'playlistName 1',
    public: false,
    songs: [
      {
        title: 'Play1', _id: 'song_1', link: 'https://www.youtube.com/watch?v=DViZWwGPLM8', service: 'youtube',
      },
      {
        title: 'Play2', _id: 'song_2', link: 'https://www.youtube.com/watch?v=DViZWwGPLM8', service: 'youtube',
      },
      {
        title: 'Play3', _id: 'song_3', link: 'https://www.youtube.com/watch?v=DViZWwGPLM8', service: 'youtube',
      },
    ],
  },
  {
    _id: 'pl_2',
    name: 'playlistName 2',
    public: true,
    songs: [
      {
        title: 'Play4', _id: 'song_4', link: 'https://www.youtube.com/watch?v=DViZWwGPLM8', service: 'youtube',
      },
      {
        title: 'Play5', _id: 'song_5', link: 'https://www.youtube.com/watch?v=DViZWwGPLM8', service: 'youtube',
      },
      {
        title: 'Play6', _id: 'song_6', link: 'https://www.youtube.com/watch?v=DViZWwGPLM8', service: 'youtube',
      },
      {
        title: 'Play7', _id: 'song_7', link: 'https://www.youtube.com/watch?v=DViZWwGPLM8', service: 'youtube',
      },
    ],
  },
];
 */

export const initialState = {
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
    data: [],
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
        playlists: {
          isFetching: false,
          errors: [],
          data: action.user.playlists || [], // defaults
        },
      };
    case actions.USER_LOGOUT:
      return {
        ...initialState,
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

    case actions.SET_PLAYLISTS_LOCALLY:
      return {
        ...state,
        playlists: {
          data: action.playlists,
          isFetching: false,
          errors: [],
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
          ...state.playlists,
          // DISABLED NEXT LINE DUE TO BUGGED Behaviour when syncing in and updating
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

    case actions.ADD_PLAYLIST_LOCALLY:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          data: [
            ...state.playlists.data,
            {
              // not sure what to put here, since we need an unique key each time
              _id: String(Date.now()),
              name: 'new playlist',
              public: false,
              songs: [],
            },
          ],
        },
      };

    case actions.DELETE_PLAYLIST_LOCALLY:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          data: state.playlists.data.filter(e => e._id !== action.id),
        },
      };

    case actions.ADD_TRACK_LOCALLY:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          data: [
            ...state.playlists.data.filter(e => e._id !== action.playlistId),
            {
              ...state.playlists.data.filter(e => e._id === action.playlistId)[0],
              songs: [...state.playlists.data.filter(e => e._id === action.playlistId)[0]
                .songs.concat(action.track)],
            },
          ],
        },
      };

    case actions.REMOVE_TRACK_LOCALLY:
      return {
        ...state,
        playlists: {
          ...state.playlists,
          data: [
            ...state.playlists.data.filter(e => e._id !== action.playlistId),
            {
              ...state.playlists.data.filter(e => e._id === action.playlistId)[0],
              songs: state.playlists.data.filter(e => e._id === action.playlistId)[0]
                .songs.filter(s => s._id !== action.trackId),
            },
          ],
        },
      };
    default: return state;
  }
};
