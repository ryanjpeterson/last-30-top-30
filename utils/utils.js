module.exports.formatSpotifyApiResponse = (item) => {
  const obj = {};

  if (item.name) obj.name = item.name;
  if (item.artists) obj.artists = item.artists;
  if (item.genres) obj.genres = item.genres;
  if (item.href) obj.href = item.href;
  if (item.type) obj.type = item.type;
  if (item.images) obj.images = item.images;
  if (item.id) obj.id = item.id;
  if (item.uri) obj.uri = item.uri;
  if (item.description) obj.description = item.description;
  if (item.owner) obj.owner = item.owner;
  if (item.external_urls.spotify) obj.spotifyURL = item.external_urls.spotify;

  // Parse item.album field to remove junk key value pairs
  if (item.album)
    obj.album = {
      images: item.album.images[0],
      external_urls: item.album.external_urls,
    };

  return obj;
};
