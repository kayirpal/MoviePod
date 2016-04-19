(function () {
    "use strict";

    // Main configuration 
    var appConfig = function (stateProvider, urlRouterProvider) {

        // Set site configuration

        //default route
        urlRouterProvider.otherwise("/dashboard");

        // Splash screen
        stateProvider.state("dashboard", {
            url: "/dashboard",
            isPrivate: true,
            controller: "DashboardController as dashboard",
            templateUrl: "app/partials/dashboard/dashboard.html"
        }).state("register", {
            url: "/register",
            controller: "RegisterController as register",
            templateUrl: "app/partials/auth/register.html"
        }).state("login", {
            url: "/login",
            controller: "LoginController as login",
            templateUrl: "app/partials/auth/login.html"
        });
    };

    // App initializer
    function initialize(rootScope, state) {

        // on route change start
        rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

            // not available to guest user
            if (toState.isPrivate && !rootScope.user) {

                // goto login
                state.go("login");
            } else {

                // logged in user cannot view guest pages
                if (!toState.isPrivate && rootScope.user) {
                    event.preventDefault();
                }
            }
        });
    }

    // main module
    angular.module("app")

        // Add main config
        .config(["$stateProvider", "$urlRouterProvider", appConfig])

        // initialize app
        .run(["$rootScope", "$state", initialize]);
} ());