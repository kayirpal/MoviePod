(function () {
    "use strict";

    // controller definition 
    function DashboardController(rootScope, api, userMovieService) {

        var dashboard = this;

        var omdbUrl = "http://www.omdbapi.com/";

        var curUser = {"_id":"571707dceae2a2c41f02f083","name":"kirpal","email":"kayirpal@gmail.com","password":"kirpal","__v":0,"movies":[{"imdbID":"tt0910970","rating":10,"_id":"571708ee95d82acc12bdaf95","timestamp":"2016-04-20T04:43:26.406Z","isWatched":true}]};

        // movie filter
        dashboard.filter = {
            title: "WALL·E",
            type: "movie"
        };

        function getMovie(queryUrl) {

            dashboard.curMovie = undefined;
            dashboard.searchingMovie = true;

            api.get(queryUrl).then(function (movie) {

                if (movie && movie.Response === "True") {

                    // find movie in user's watch list
                    var userMovies = curUser.movies;

                    if (userMovies && userMovies.length) {

                        userMovies.forEach(function (userMovie) {

                            // if movie is present in user list
                            if (movie.imdbID === userMovie.imdbID) {

                                // update watched flag
                                movie.isWatched = userMovie.isWatched;

                                // update rating
                                movie.rating = userMovie.rating || 0;

                                // set user ratings info
                                movie.userRatings = true;
                            }
                        });
                    }

                    // update rating with imdb rating
                    if (!movie.rating) {
                        movie.rating = Math.round(parseInt(movie.imdbRating, 10));
                    }

                    dashboard.curMovie = movie;
                }

                dashboard.searchingMovie = false;
            }, function (error) {
                console.log(error);
                dashboard.searchingMovie = false;
            });
        }

        // search for movie
        dashboard.searchMovie = function (filter) {

            // base url
            var url = omdbUrl.concat("?t=");

            // search for title
            if (filter.title) {
                url = url.concat(encodeURIComponent(filter.title), "&");

                // search for type
                if (filter.type) {
                    url = url.concat("type=", encodeURIComponent(filter.type), "&");
                }

                // search using release year
                if (filter.releaseYear) {
                    url = url.concat("y=", encodeURIComponent(filter.releaseYear), "&");
                }

                // get movie details
                getMovie(url);

            } else {
                alert("search string is required");
            }

        };

        // update movie watch status
        dashboard.updateUserMovie = function (movieDetails) {

            var userMovies = curUser.movies || [],
                isNew = true,
                userId = curUser._id,
                userMovie = userMovies.filter(function (movie) {
                    return movie.imdbID === movieDetails.imdbID;
                });

            // if found
            if (userMovie && userMovie.length > 0) {

                // set current user movie
                userMovie = userMovie[0];

                isNew = false;

                // if not found
            } else {

                // create new ent
                userMovie = {
                    imdbID: movieDetails.imdbID,
                };

                userMovies.push(userMovie);
            }

            // set flag and rating
            userMovie.isWatched = !movieDetails.isWatched;
            userMovie.rating = movieDetails.rating;


            // call service method
            userMovieService.addOrUpdate(userMovie, isNew).then(function (reponse) {

                // saved in DB, update view
                if (reponse && reponse.ok) {
                    movieDetails.isWatched = userMovie.isWatched;
                }

            }, function (error) {
                console.log(error);
            });
        };

        dashboard.updateRatings = function (newRating) {

            var movieDetails = dashboard.curMovie;
            
            // update ratings
            movieDetails.rating = newRating;
            movieDetails.isWatched = !movieDetails.isWatched;
            
            dashboard.updateUserMovie(movieDetails);
        };

        // init
        (function () {


            // base url
            var walleUrl = omdbUrl.concat("?i=tt0910970");

            // get default movie details (Wall-E)
            getMovie(walleUrl);
            
            

        } ());

    }

    // define partials module
    angular.module("dashboard.module")

        // attaching the controller to the module
        .controller("DashboardController", ["$rootScope", "api", "usermovie", DashboardController]);
} ());