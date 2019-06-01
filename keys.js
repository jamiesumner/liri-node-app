console.log('this is loaded');

exports.spotify = {
    id: process.env.SPOTIFY_CLIENTID,
    secret: process.env.SPOTIFY_SECRET
}

exports.OMDB = {
    key: process.env.OMDB_KEY
}