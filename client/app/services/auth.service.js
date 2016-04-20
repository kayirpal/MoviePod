(function () {
    "use strict";

    // define service
    function Service(api) {

        var auth = this,
            sessionKey = "SESSION_KEY",
            serviceEndpoint = "users/";

        // Get user
        auth.getUserDetails = function (userId) {
            return api.get(serviceEndpoint, userId);
        };

        // create user
        auth.createUser = function (userData) {
            return api.post(serviceEndpoint, userData);
        };

        // authorize user
        auth.authorize = function (userData) {

            // set auth end point 
            var authEndpoint = serviceEndpoint.concat("authorize/");

            // make api call
            return api.post(authEndpoint, userData);
        };

        // start session
        auth.startSession = function (user) {

            // if user details
            if (user && user._id) {

                // details to be saved
                var userDetails = JSON.stringify(user);

                // if storage available
                if (Storage && localStorage) {

                    // save details
                    localStorage.setItem(sessionKey, userDetails);
                }
            }
        };

        // get user session
        auth.checkSession = function () {

            // details to be saved
            var userDetails;

            // if storage available
            if (Storage && localStorage) {

                // get details
                userDetails = localStorage.getItem(sessionKey);

                // parse user details
                try {
                    return JSON.parse(userDetails);
                } catch (ex) {
                    console.log(userDetails);
                }
            }
        };

        // logout user
        auth.logout = function () {

            // if storage available
            if (Storage && localStorage) {

                // save details
                localStorage.removeItem(sessionKey);
            }
        };
    }

    // define services module
    angular.module("services.module")

        // attach service to module
        .service("auth", ["api", Service]);
} ());