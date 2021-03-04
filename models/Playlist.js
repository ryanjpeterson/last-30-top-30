const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  title: String,
  user: Object,
  tracks: Array,
  trackUris: Array,
  trackIds: Array,
  topArtists: Array,
  dateAdded: Date,
});

const Playlist = mongoose.model('Playlists', PlaylistSchema);

module.exports = Playlist;
