import React from 'react';
import { useDataLayerValue } from '../../context/DataLayer';
import axios from 'axios';

function SpotifySaveExistingBtn() {
  const [{ currentPlaylist }] = useDataLayerValue();

  const createSpotifyPlaylist = async () => {
    const data = {
      title: currentPlaylist?.title,
      trackUris: currentPlaylist?.trackUris,
    };

    try {
      const response = await axios.post('/saveExistingPlaylist', data);
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

export default SpotifySaveExistingBtn;
