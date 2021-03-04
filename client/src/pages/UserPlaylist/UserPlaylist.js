import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import './UserPlaylist.css';
import { useDataLayerValue } from '../../context/DataLayer';

// Components
import PageHeader from '../../components/PageHeader/PageHeader';
import PageOptions from '../../components/PageOptions/PageOptions';
import TrackCard from '../../components/TrackCard/TrackCard';
import Loader from '../../components/Loader/Loader';

function UserPlaylistPage({ playlistId }) {
  const [{ currentUser, currentPlaylist }, dispatch] = useDataLayerValue();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchPlaylist = async () => {
    const playlist = await axios.get(`/playlists/${playlistId}`);

    await dispatch({
      type: 'SET_CURRENT_PLAYLIST',
      currentPlaylist: playlist.data[0],
    });

    setLoading(false);
  };

  return (
    <div className="grid-container">
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <PageHeader description={currentPlaylist?.title} />
          {currentUser ? (
            <PageOptions saveToSpotify currentPlaylist={currentPlaylist} />
          ) : null}
          {currentPlaylist?.tracks.map((track, i) => (
            <TrackCard track={track} key={i} rank={i} />
          ))}
        </Fragment>
      )}
    </div>
  );
}

export default UserPlaylistPage;
