require("dotenv").config()
const Spotify = require("node-spotify-api");
const keys = require("./keys");
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

const spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});

const command = process.argv[2];
const input = process.argv[3];

switch (command) {
    case "spotify-this-song":
        spotifySearch();
        break;

    case "movie-this":
        movieThis();
        break;

    case "concert-this":
        concertThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}

function spotifySearch() {
    if (input === undefined) {
        spotify.search({ type: 'track', query: "The Sign" }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // only console logs all the data - need to specify what to console log
            console.log(JSON.stringify(data, null, 2));
        });
    } else {
        spotify.search({ type: 'track', query: input }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // only console logs all the data - need to specify what to console log
            console.log(JSON.stringify(data, null, 2));
        });
    }
}

function movieThis() {
    if (input === undefined) {
        axios.get('https://www.omdbapi.com/?t=Mr.Nobody&apikey=trilogy')
            .then(function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        axios.get('https://www.omdbapi.com/?t=' + input + '&apikey=trilogy')
            .then(function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

function concertThis() {
    axios.get('https://rest.bandsintown.com/artists/' + input + '/events?app_id=codingbootcamp')
        .then(function (response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city);
            console.log("Date: " + moment(response.data[0].datetime).format('MM/DD/YYYY'));
        })
        .catch(function (error) {
            console.log(error);
        });
}

function doWhatItSays() {

}