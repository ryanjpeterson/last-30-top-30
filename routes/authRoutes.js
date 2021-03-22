const keys = require('../config/keys');

module.exports = (app, spotifyApi) => {
  app.get('/login', (req, res) => {
    const scopes = [
      'ugc-image-upload',
      'user-read-email',
      'user-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-read-private',
      'playlist-modify-private',
      'user-top-read',
      'user-read-recently-played',
    ];

    res.redirect(
      spotifyApi.createAuthorizeURL(scopes, null, { showDialog: true })
    );
  });

  app.get('/callback', async (req, res) => {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }

    try {
      const data = await spotifyApi.authorizationCodeGrant(code);

      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      res.cookie('access_token', access_token);
      res.cookie('refresh_token', refresh_token);

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);

      return res.redirect(keys.origin);
    } catch (err) {
      res.status(400).json(err);
    }
  });
};
