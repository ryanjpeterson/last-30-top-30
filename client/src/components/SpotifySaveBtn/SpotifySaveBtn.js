import React from 'react';
import { useDataLayerValue } from '../../context/DataLayer';
import axios from 'axios';

function SpotifySaveBtn() {
  const [{ topTracks, currentUser }] = useDataLayerValue();

  const createSpotifyPlaylist = async () => {
    const currentDate = `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`;

    const title = `${currentDate} - Last30/Top30: ${currentUser?.id}`;

    const data = {
      userId: currentUser?.id,
      title: title,
      tracks: topTracks,
    };

    try {
      const response = await axios.post('/api/createSpotifyPlaylist', data);
      alert(response.data.message);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="btn-style-container" onClick={createSpotifyPlaylist}>
      <i className="fab fa-spotify save-button"></i>
      <span>Save to Spotify</span>
    </div>
  );
}

export default SpotifySaveBtn;
