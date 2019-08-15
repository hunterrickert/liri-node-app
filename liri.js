require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

let action = process.argv[2];
let search = process.argv.slice(3).join(" ");

var choose = function (action, search) {
    switch (action) {
        case 'spotify-this-song':
            console.log("Spotify chosen");
            searchSpotify(search);
            break;

        case 'concerts-this':
            searchConcerts(search);
            break;

        case 'movies-this':
            searchMovies(search);
            break;
        case 'do-what-it-says':
            searchDoWhatItSays();
            break;

    }
}

choose(action, search);

function searchSpotify(search) {
    console.log("Spotify Function running");
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let songs = data.tracks.items
        //    console.log(songs[0]);
        for (let i = 1; i < songs.length; i++) {
            console.log("Artist: " + songs[i].artists[0].name)
            console.log("Song Name: " + songs[i].name)
            console.log("Link: " + songs[i].preview_url)
            console.log("Album: " + songs[i].album.name)
            console.log("-----------------------------------")


        }

    });
}

function searchMovies(search) {

    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(


        function (response) {
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("RT Rating: " + response.data.Ratings.JSON.stringify());
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            // console.log(response.data);
        })

}

function searchConcerts(search) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            // console.log("Venue: " + response.data.venue.name);
            // console.log("Date: " + response.data.datetime);
            console.log(response.data.datetime)
        })

}

function searchDoWhatItSays (){

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        action = dataArr[0];
        search = dataArr.slice(1).join(" ");
        console.log(action);
        console.log(search);

        choose(action, search);
      
      });
}

