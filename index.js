const app = require('express')();
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Playlist = require('./models/Playlist');
const userPlaylists = require('./userPlaylists');

const keys = require('./config/keys');
const { formatSpotifyApiResponse } = require('./utils/utils');

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

app.get('/', (req, res) => {
  console.log(keys);
  return res.json(process.env);
});

// app.get('/test', (req, res) => {
//   const data = userPlaylists.map((playlist, i) => {
//     const tracks = playlist.tracks.map((track, i) => {
//       return {
//         name: track.name,
//         artists: track.artists,
//         uri: track.uri,
//         href: track.href,
//         album: {
//           external_urls: track.album.external_urls,
//           images: track.album.images[0],
//         },
//       };
//     });

//     const response = {
//       tracks: tracks,
//       trackIds: playlist.trackIds,
//       topArtists: playlist.topArtists,
//       user: playlist.user,
//       dateAdded: playlist.dateAdded,
//       trackUris: playlist.trackUris,
//       title: playlist.title,
//       dateAdded: playlist.dateAdded,
//     };

//     return response;
//   });

//   try {
//     data.forEach((track) => {
//       const {
//         title,
//         user,
//         tracks,
//         trackUris,
//         trackIds,
//         topArtists,
//         dateAdded,
//       } = track;
//       const newPlaylist = new Playlist({
//         title,
//         user,
//         tracks,
//         trackUris,
//         trackIds,
//         topArtists,
//         dateAdded,
//       });

//       newPlaylist.save((err) => {
//         if (err) throw err;
//         else {
//           console.log({
//             message: `Playlist saved under id ${newPlaylist.id}`,
//           });
//         }
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// Auth routes
require('./routes/authRoutes')(app, spotifyApi);
require('./routes/spotifyRoutes')(app, spotifyApi);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`App is listening on ${PORT}`);
});
