import * as actions from '../actions/user';

const eraseSamplePlaylists = [
  {
    _id: 'pl_1',
    name: 'playlistName 1',
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
