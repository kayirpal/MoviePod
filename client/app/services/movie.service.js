(function () {
    "use strict";

    // define service
    function Service(api, auth) {

        var usermovie = this;

        var userUrl = "users/";

        // TODO: get it from auth service
        var userId = "571707dceae2a2c41f02f083";

        var baseMovieUrl = userUrl.concat(userId, "/movies/");

        // get all user movie
        usermovie.get = function (imdbID) {

            var url = imdbID ? baseMovieUrl.concat(imdbID) : baseMovieUrl;

            return api.get(url);
        };

        // add or update user movie
        usermovie.addOrUpdate = function (movie, isNew) {

            // create post request to add movie
            if (isNew) {
                return api.post(baseMovieUrl, movie);
            }

            // create put request for update            
            return api.put(baseMovieUrl, movie.imdbID, movie);
        };

    }

    // define services module
    angular.module("services.module")

        // attach service to module
        .service("usermovie", ["api", "auth", Service]);
} ());