export const initialState = {
  currentUser: null,
  userPlaylists: [],
  topTracks: [],
  currentUserPlaylist: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case 'SET_TOP_TRACKS':
      return {
        ...state,
        topTracks: action.topTracks,
      };

    case 'SET_USER_PLAYLISTS':
      return {
        ...state,
        userPlaylists: action.userPlaylists,
      };

    case 'SET_CURRENT_PLAYLIST':
      return {
        ...state,
        currentPlaylist: action.currentPlaylist,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
