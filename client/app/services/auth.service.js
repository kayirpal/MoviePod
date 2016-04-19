(function () {
    "use strict";

    // define service
    function Service(api) {

        var auth = this,
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

    }

    // define services module
    angular.module("services.module")

        // attach service to module
        .service("auth", ["api", Service]);
} ());