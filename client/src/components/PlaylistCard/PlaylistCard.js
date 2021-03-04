import React from 'react';
import { Link } from 'react-router-dom';
import './PlaylistCard.css';

import { formatDateAdded } from '../../utils/utils';

function Playlist({
  playlist: {
    _id,
    topArtists,
    dateAdded,
    user: { userDisplayName, userProfileImage, userId },
  },
}) {
  return (
    <div className="playlist">
      <Link to={`/playlists/${_id}`}>
        <span className="playlist__date">{formatDateAdded(dateAdded)}</span>
        <div className="playlist__info">
          <div className="playlist__info--user">
            <img
              className="playlist__info--image"
              src={userProfileImage}
              alt={userDisplayName}
            />
            <span className="playlist__info--user">{userId}</span>
          </div>
          <p className="playlist__info--featuring">{`Featuring ${topArtists[0]}, ${topArtists[1]}, ${topArtists[2]} & more.`}</p>
        </div>
      </Link>
    </div>
  );
}

export default Playlist;
