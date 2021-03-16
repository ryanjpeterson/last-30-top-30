const express = require('express');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const keys = require('./config/keys');

const app = express();

dotenv.config();
mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());

app.use(
  cors({
    credentials: true,
    origin: keys.origin,
  })
);

app.use(cookieParser());

const spotifyApi = new SpotifyWebApi({
  clientId: keys.spotifyClientId,
  clientSecret: keys.spotifyClientSecret,
  redirectUri: keys.spotifyRedirectUri,
});

// Auth routes
require('./routes/authRoutes')(app, spotifyApi);
require('./routes/spotifyRoutes')(app, spotifyApi);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`App is listening on ${PORT}`);
});
