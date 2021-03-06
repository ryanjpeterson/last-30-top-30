import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useDataLayerValue } from './context/DataLayer';

import { Route } from 'react-router-dom';

// Components
import Header from './components/Header/Header';

// Pages
import LoginPage from './pages/Login/Login';
import TopTracksPage from './pages/TopTracks/TopTracks';
import PlaylistsPreviewPage from './pages/PlaylistsPreview/PlaylistsPreview';
import UserPlaylistPage from './pages/UserPlaylist/UserPlaylist';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers['Access-Control-Allow-Origin'] =
  process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  const [{ currentUser }, dispatch] = useDataLayerValue();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    if (!currentUser) {
      const user = await axios.get('/api/me');
      dispatch({
        type: 'SET_CURRENT_USER',
        currentUser: user.data.body,
      });
    }
  };

  return (
    <div className="App">
      <div className="App__bg-color-wrapper">
        <Header />
        <Route
          exact
          path="/"
          render={() => (!currentUser ? <LoginPage /> : <TopTracksPage />)}
        />
        <Route exact path="/playlists" component={PlaylistsPreviewPage} />
        <Route
          exact
          path="/playlists/:id"
          render={({ match }) => (
            <UserPlaylistPage playlistId={match.params.id} />
          )}
        />
      </div>
    </div>
  );
}

export default App;
