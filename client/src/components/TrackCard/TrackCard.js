import React from 'react';
import Rank from '../Rank/Rank';
import Placeholder from '../../img/placeholder.png';
import './TrackCard.css';

function TrackCard({
  track: {
    album: {
      images,
      external_urls: { spotify },
    },
    name,
    artists,
  },
  rank,
}) {
  return (
    <div
      className="track-card"
      style={{
        backgroundImage: `url(${images?.url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
      }}
    >
      <Rank rank={rank + 1} className="rank" />
      <div className="track-card__content">
        <a href={spotify} className="track-card__cover">
          <img src={images?.url ? images.url : Placeholder} alt={name} />
        </a>

        <div className="track-card__info">
          <h3 className="track-card__info--artist">{artists[0].name}</h3>
          <p className="track-card__info--title">{name}</p>
        </div>
      </div>
    </div>
  );
}

export default TrackCard;
