import React from 'react';
import { useDataLayerValue } from '../../context/DataLayer';
import axios from 'axios';

function DBSaveBtn() {
  const [{ topTracks, currentUser }] = useDataLayerValue();

  const currentDate = `${
    new Date().getMonth() + 1
  }/${new Date().getDate()}/${new Date().getFullYear()}`;

  const title = `${currentDate}: ${currentUser?.display_name}'s Last30/Top30`;

  const user = {
    userDisplayName: currentUser?.display_name,
    userProfileUrl: currentUser?.external_urls.spotify,
    userId: currentUser?.id,
    userProfileImage: currentUser?.images[0]?.url,
  };

  const tracks = topTracks.map((track) => {
    return {
      name: track.name,
      artists: track.artists,
      uri: track.uri,
      id: track.id,
      album: track.album,
      href: track.href,
    };
  });
  const trackIds = topTracks.map((track) => track.id);
  const trackUris = topTracks.map((track) => track.uri);
  const topArtists = topTracks
    .map((track) => track.artists[0].name)
    .filter((v, i, a) => a.indexOf(v) === i)
    .splice(0, 3);

  const SavePlaylistToDB = async () => {
    const data = {
      title,
      user,
      tracks,
      trackIds,
      trackUris,
      topArtists,
    };

    try {
      const response = await axios.post('/savePlaylistToDB', data);
      alert(response.data.message);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="btn-style-container" onClick={SavePlaylistToDB}>
      <i className="fas fa-save save-button" />
      <span>Save to Last30/Top30</span>
    </div>
  );
}

export default DBSaveBtn;
