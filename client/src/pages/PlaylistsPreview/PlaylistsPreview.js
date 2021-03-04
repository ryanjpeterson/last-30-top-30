import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useDataLayerValue } from '../../context/DataLayer';
import PlaylistCard from '../../components/PlaylistCard/PlaylistCard';
import Loader from '../../components/Loader/Loader';
import './PlaylistsPreview.css';

// Components
import PageHeader from '../../components/PageHeader/PageHeader';

function PlaylistsPreviewPage() {
  const [{ userPlaylists }, dispatch] = useDataLayerValue();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const session = JSON.parse(sessionStorage.getItem('userPlaylists'));
    if (session) {
      dispatch({
        type: 'SET_USER_PLAYLISTS',
        userPlaylists: session,
      });
    } else {
      const playlists = await getUserPlaylists();
      sessionStorage.setItem('userPlaylists', JSON.stringify(playlists));

      dispatch({
        type: 'SET_USER_PLAYLISTS',
        userPlaylists: playlists,
      });
    }

    setLoading(false);
  }, []);

  const getUserPlaylists = async () => {
    const response = await axios.get('/playlists');
    return response.data;
  };

  return (
    <Fragment>
      <div className="grid-container">
        <PageHeader description="User Playlists" />
        {loading ? (
          <Loader />
        ) : (
          userPlaylists?.map((playlist, i) => (
            <PlaylistCard key={i} playlist={playlist} id={playlist.id} />
          ))
        )}
      </div>
    </Fragment>
  );
}

export default PlaylistsPreviewPage;
