import React from 'react';
import Logo from '../../img/logo.png';
import './Login.css';

function LoginPage() {
  let loginUrl;

  if (process.env.NODE_ENV === 'development') {
    loginUrl = `${process.env.REACT_APP_DEVELOPMENT_SERVER_URL}/login`;
  } else {
    loginUrl = `${process.env.REACT_APP_PRODUCTION_SERVER_URL}/login`;
  }

  return (
    <div className="login">
      <img src={Logo} className="login__logo" alt="Last30/Top30" />
      <a className="login__btn" href={loginUrl}>
        LOGIN WITH SPOTIFY
      </a>
      <div className="login__description">
        <p>
          Welcome to <span className="bold">Last30/Top30</span>! View your top
          30 tracks of the last 30 days, save them as a Spotify playlist and
          view and save other user's <span className="bold">Last30/Top30</span>!
        </p>
        <p>
          It's similar to your <span className="bold">On Repeat</span> playlist
          but... easier to show off to the world.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
