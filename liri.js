require("dotenv").config()
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var axios = require("axios");

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

var command = process.argv[2];
var userSearch = "";

for (var i = 3; i < process.argv.length; i++) {
    userSearch += process.argv[i] + " "
}

if (command === "spotify-this-song") {
    spotifySearch(userSearch)
} else if (command === "movie-this") {
    movieThis(userSearch)
}

function spotifySearch(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(JSON.stringify(data, null, 2));
    });
}

function movieThis(movie) {
    axios.get('http://www.omdbapi.com/?apikey=' + keys.OMDB.key + '&s=' + movie)
        .then(function (response) {
            console.log(response.data.Search[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
}