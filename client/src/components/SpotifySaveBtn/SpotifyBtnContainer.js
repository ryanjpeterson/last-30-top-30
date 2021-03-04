import React, { Fragment } from 'react';
import SpotifySaveBtn from './SpotifySaveBtn';
import SpotifySaveExistingBtn from './SpotifySaveExistingBtn';

function SpotifyBtnContainer({ currentPlaylist }) {
  return (
    <Fragment>
      {currentPlaylist ? <SpotifySaveExistingBtn /> : <SpotifySaveBtn />}
    </Fragment>
  );
}

export default SpotifyBtnContainer;
