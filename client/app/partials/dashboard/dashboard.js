(function () {
    "use strict";

    // controller definition 
    function DashboardController() {
        var dashboard = this;

        dashboard.curMovie = {
            "Title": "WALL·E",
            "Year": "2008",
            "Rated": "G",
            "Released": "27 Jun 2008",
            "Runtime": "98 min",
            "Genre": "Animation, Adventure, Family",
            "Director": "Andrew Stanton",
            "Writer": "Andrew Stanton (original story by), Pete Docter (original story by), Andrew Stanton (screenplay), Jim Reardon (screenplay)",
            "Actors": "Ben Burtt, Elissa Knight, Jeff Garlin, Fred Willard",
            "Plot": "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
            "Language": "English",
            "Country": "USA",
            "Awards": "Won 1 Oscar. Another 86 wins & 85 nominations.",
            "Poster": "http://ia.media-imdb.com/images/M/MV5BMTczOTA3MzY2N15BMl5BanBnXkFtZTcwOTYwNjE2MQ@@._V1_SX300.jpg", "Metascore": "94",
            "imdbRating": "8.4",
            "imdbVotes": "691,092",
            "imdbID": "tt0910970",
            "Type": "movie",
            "Response": "True"
        };
        
        
        dashboard.updateRatings = function (newRating) {
            
            alert(newRating);
            
        };
    }

    // define partials module
    angular.module("dashboard.module")

        // attaching the controller to the module
        .controller("DashboardController", [DashboardController]);
} ());