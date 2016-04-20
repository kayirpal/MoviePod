(function () {
    "use strict";

    // controller definition 
    function LoginController(rootScope, state, auth, validate) {
        var login = this;

        // new user details
        login.user = {};

        // create user
        login.authorize = function (user) {

            login.user.message = undefined;

            // password
            if (validate.isNonEmptyString(user.password) &&

                // email
                validate.isValidEmail(user.email, user)) {

                // all good, add user
                auth.authorize(user).then(function (validUser) {

                    // if user signed up successfully
                    if (!!validUser && !!validUser._id) {

                        // update current user in root scope
                        rootScope.curUser = validUser;

                        // save in session storage
                        auth.startSession(validUser);

                        // navigate to dashboard
                        state.go("dashboard");
                    } else {

                        login.user.message = "Sorry! wrong credentials";
                    }

                }, function (error) {
                    login.user.message = "Sorry our bad, couldn't let you in";
                    console.log(error);
                });
            }
        };
    }

    // define partials module
    angular.module("auth.module")

        // attaching the controller to the module
        .controller("LoginController", ["$rootScope", "$state", "auth", "validate", LoginController]);
} ());