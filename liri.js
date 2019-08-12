require("dotenv").config();

const action = process.argv[2];
const search = process.argv[3];

switch(action) {
case 'spotify':
    searchSpotify(search);
    break;

case 'concerts':
    searchConcerts(search);
    break;

case 'movies':
    searchMovies(search);
    break;

}
