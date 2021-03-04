import React from 'react';
import './Header.css';
import { useDataLayerValue } from '../../context/DataLayer';

import { Link } from 'react-router-dom';

function Header() {
  const [{ currentUser }, dispatch] = useDataLayerValue();

  const logoutCurrentUser = () => {
    sessionStorage.removeItem('topTracks');

    dispatch({
      type: 'SET_CURRENT_USER',
      currentUser: null,
    });
  };
  return (
    <header className="header">
      <Link to="/" className="header__link header__title">
        <h2>Last30/Top30</h2>
      </Link>
      <br />
      <div className="header__right">
        <Link className="header__link header__link--option" to="/playlists">
          User Playlists
        </Link>
        {currentUser ? (
          <div
            onClick={logoutCurrentUser}
            className="header__link header__link--option"
          >
            Logout
          </div>
        ) : (
          <a className="header__link header__link--option" href="/">
            Login
          </a>
        )}
      </div>
    </header>
  );
}

export default Header;
