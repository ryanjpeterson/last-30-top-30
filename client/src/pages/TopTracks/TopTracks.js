import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { useDataLayerValue } from '../../context/DataLayer';
import './TopTracks.css';

// Components
import UserGreeting from '../../components/UserGreeting/UserGreeting';
import TrackCard from '../../components/TrackCard/TrackCard';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageOptions from '../../components/PageOptions/PageOptions';
import Loader from '../../components/Loader/Loader';

function TopTracksPage() {
  const [{ topTracks, currentUser }, dispatch] = useDataLayerValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionStorageTracks = sessionStorage.getItem('topTracks');

    if (sessionStorageTracks) {
      dispatch({
        type: 'SET_TOP_TRACKS',
        topTracks: JSON.parse(sessionStorageTracks),
      });
    } else {
      getTopTracks();
    }

    setLoading(false);
  }, []);

  const getTopTracks = async () => {
    const response = await axios.get('/api/topTracks');
    sessionStorage.setItem('topTracks', JSON.stringify(response.data));
    await dispatch({
      type: 'SET_TOP_TRACKS',
      topTracks: response.data,
    });
  };

  return (
    <div className="grid-container">
      <Fragment>
        <UserGreeting />
        <PageHeader description="Here are your top 30 tracks from the last 30 days. Neat!" />
        {currentUser ? <PageOptions saveToSpotify saveToDB /> : null}

        {loading ? (
          <Loader />
        ) : (
          topTracks.map((track, i) => (
            <TrackCard key={track.id} track={track} rank={i} />
          ))
        )}
      </Fragment>
    </div>
  );
}

export default TopTracksPage;
