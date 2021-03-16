module.exports = {
  origin: 'https://last-30-top-30.herokuapp.com',
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  spotifyRedirectUri: 'https://last-30-top-30.herokuapp.com/callback',
  mongoURI: process.env.MONGO_URI,
};
