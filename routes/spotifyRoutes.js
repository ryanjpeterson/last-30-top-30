const { formatSpotifyApiResponse } = require('../utils/utils');
const Playlist = require('../models/Playlist');

module.exports = (app, spotifyApi) => {
  app.get('/api/me', async (req, res) => {
    spotifyApi.setAccessToken(req.cookies['access_token']);

    try {
      const response = await spotifyApi.getMe();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  app.get('/api/topTracks', async (req, res) => {
    spotifyApi.setAccessToken(req.cookies['access_token']);

    try {
      const response = await spotifyApi.getMyTopTracks({
        limit: 30,
        time_range: 'short_term',
      });

      const data = Array.from(response.body.items).map((track) =>
        formatSpotifyApiResponse(track)
      );

      return res.json(data);
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  app.post('/api/createSpotifyPlaylist', async (req, res) => {
    spotifyApi.setAccessToken(req.cookies['access_token']);

    const { title, tracks } = req.body;
    const trackUris = tracks.map((track) => track.uri);

    try {
      const playlistCreateResponse = await spotifyApi.createPlaylist(title, {
        description: title,
        public: true,
      });

      const playlist = formatSpotifyApiResponse(playlistCreateResponse.body);

      await spotifyApi.addTracksToPlaylist(playlist.id, trackUris);

      return res.status(200).json({
        message: `Playlist created under id: ${playlist.id}`,
        playlist,
      });
    } catch (err) {
      // return res.status(400).json(err);
      return res.json({ title, tracks });
    }
  });

  app.post('/api/saveExistingPlaylist', async (req, res) => {
    spotifyApi.setAccessToken(req.cookies['access_token']);

    const { title, trackUris } = req.body;

    try {
      const playlistCreateResponse = await spotifyApi.createPlaylist(title, {
        description: title,
        public: true,
      });

      const playlist = formatSpotifyApiResponse(playlistCreateResponse.body);

      await spotifyApi.addTracksToPlaylist(playlist.id, trackUris);

      return res.status(200).json({
        message: `Playlist created under id: ${playlist.id}`,
        playlist,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  app.get('/api/playlists', async (req, res) => {
    try {
      const userPlaylists = await Playlist.find().sort({ dateAdded: -1 });
      return res.status(200).json(userPlaylists);
    } catch (err) {
      return res.status(400).json(err);
    }
  });

  app.post('/api/savePlaylistToDB', async (req, res) => {
    const { title, user, tracks, trackIds, trackUris, topArtists } = req.body;

    if (!user.userProfileImage) {
      user.userProfileImage =
        'https://firebasestorage.googleapis.com/v0/b/last-30-top-30.appspot.com/o/userIcon.png?alt=media&token=26e20eae-64cc-4934-92d3-91888fb39fc7';
    }

    if (tracks.length === 0) {
      return alert('You have no tracks to share! Get listening!');
    }

    try {
      const newPlaylist = new Playlist({
        title,
        user,
        tracks,
        trackUris,
        trackIds,
        topArtists,
        dateAdded: new Date().toISOString(),
      });

      await newPlaylist.save((err) => {
        if (err) throw err;
        else {
          res.json({
            message: `Playlist saved under id ${newPlaylist.id}`,
          });
        }
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  app.get('/api/playlists/:id', async (req, res) => {
    const playlistId = req.params.id;

    try {
      const playlist = await Playlist.find({ _id: playlistId });
      res.status(200).json(playlist);
    } catch (err) {
      res.status(400).json(err);
    }
  });
};
