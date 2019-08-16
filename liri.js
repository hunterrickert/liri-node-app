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
            console.log("---------------------------")
            searchSpotify(search);
            break;

        case 'concerts-this':
                console.log("Bands in Town chosen");
                console.log("---------------------------")
            searchConcerts(search);
            break;

        case 'movies-this':
                console.log("OMDB chosen");
                console.log("---------------------------")
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
        // for (let i = 0; i < songs.length; i++) {
        console.log("Artist: " + songs[0].artists[0].name)
        console.log("Song Name: " + songs[0].name)
        console.log("Link: " + songs[0].preview_url)
        console.log("Album: " + songs[0].album.name)
        console.log("-----------------------------------")
        // console.log(songs[0]);


        // }

    });
}

function searchMovies(search) {

    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(

    
        function (response) {
            let movies = response.data;
            // console.log("Information about")
            // console.log("Release Year: " + movies.Year);
            // console.log("IMDB Rating: " + movies.imdbRating);
            console.log("RT Rating: " + movies.Ratings[1].Value);
            // console.log("Country: " + movies.Country);
            // console.log("Language: " + movies.Language);
            // console.log("Plot: " + movies.Plot);
            // console.log("Actors: " + movies.Actors);
            // console.log(response.data);
        })

}

function searchConcerts(search) {

    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            let concerts = response.data;
          
             for (let i = 0; i < concerts.length; i++) {

                console.log("Vanue Name: " + concerts[i].venue.name);
                console.log("Venue Location: " + concerts[i].venue.country);
                
                //ask shelly about this!!!
           console.log("Date: " + moment(concerts[i].datetime).format("MM/DD/YYYY"));
            // console.log(response.data.datetime.moment())
            // console.log(concerts)
            }
        })

}

function searchDoWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        // console.log(data);

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

