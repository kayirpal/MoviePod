(function () {
    "use strict";

    // controller definition 
    function DashboardController(rootScope, api, userMovieService) {

        var dashboard = this;

        var omdbUrl = "http://www.omdbapi.com/";

        // cur user details
        var curUser = rootScope.curUser;

        // movie filter
        dashboard.filter = {
            title: "WALL·E",
            type: "movie"
        };

        // search for movie
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

            dashboard.multipleMovies = false;

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
        dashboard.nextMovie = function () {

            var curMovieIndex,
                nextMovieIndex,
                curMovie = dashboard.curMovie,
                nextMovieId;

            var curUserMovies = curUser.movies || [];

            if (curMovie && curUserMovies.length > 1) {

                curMovieIndex = curUserMovies.findIndex(function (movie) { return movie.imdbID === curMovie.imdbID; });

                curMovieIndex += 1;

                nextMovieIndex = curMovieIndex === curUserMovies.length ? 0 : curMovieIndex;
                
                nextMovieId = curUserMovies[nextMovieIndex].imdbID;

                // base url
                var movieUrl = omdbUrl.concat("?i=", nextMovieId);

                // get next movie
                getMovie(movieUrl);
            }
        };

        // update movie watch status
        dashboard.updateUserMovie = function (movieDetails) {

            var isNew = true,
                userId = curUser._id,
                userMovie = curUser.movies.filter(function (movie) {
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

            }

            // set flag and rating
            userMovie.isWatched = !movieDetails.isWatched;
            userMovie.rating = movieDetails.rating;


            // call service method
            userMovieService.addOrUpdate(userMovie, isNew).then(function (reponse) {

                // saved in DB, update view
                if (reponse && reponse.ok) {

                    movieDetails.isWatched = userMovie.isWatched;

                    if (isNew) {
                        curUser.movies.push(userMovie);
                    }

                    dashboard.multipleMovies = curUser.movies.length > 1;
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

            dashboard.searchingMovie = true;

            // set base url
            userMovieService.setBaseUrl(curUser);

            // get updated user movies
            userMovieService.get().then(function (movies) {

                var firstMovieId;

                curUser.movies = movies || [];

                if (curUser.movies.length) {

                    // 
                    firstMovieId = curUser.movies[0].imdbID;

                    dashboard.multipleMovies = curUser.movies.length > 1;

                } else {

                    // default first movie, Wall-E 
                    firstMovieId = "tt0910970";
                }

                // base url
                var movieUrl = omdbUrl.concat("?i=", firstMovieId);

                // get default movie details (Wall-E)
                getMovie(movieUrl);

            }, function (error) {

                console.log(error);
            });

        } ());
    }

    // define partials module
    angular.module("dashboard.module")

        // attaching the controller to the module
        .controller("DashboardController", ["$rootScope", "api", "usermovie", DashboardController]);
} ());