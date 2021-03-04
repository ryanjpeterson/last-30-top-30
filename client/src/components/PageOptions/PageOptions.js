import React from 'react';
import './PageOptions.css';
import DBSaveBtn from '../DBSaveBtn/DBSaveBtn';
import SpotifyBtnContainer from '../SpotifySaveBtn/SpotifyBtnContainer';

function PageOptions({ saveToSpotify, saveToDB, currentPlaylist }) {
  return (
    <div className="page-options">
      {saveToSpotify ? (
        <SpotifyBtnContainer currentPlaylist={currentPlaylist} />
      ) : null}
      {saveToDB ? <DBSaveBtn /> : null}
    </div>
  );
}

export default PageOptions;
