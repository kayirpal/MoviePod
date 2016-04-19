(function () {
    "use strict";

    // controller definition 
    function RegisterController(rootScope, state, auth, validate) {
        var register = this;

        // new user details
        register.newUser = {};

        // create user
        register.createUser = function (newUser) {

            // chech basic 
            // name
            if (validate.isNonEmptyString(newUser.name) &&

                // password
                validate.isNonEmptyString(newUser.password) &&

                // email
                validate.isValidEmail(newUser.email, newUser)) {

                // confirm password
                if (newUser.cPassword !== newUser.password) {
                    newUser.unmatchedPassword = true;
                    return;
                }

                // all good, add user
                auth.createUser(newUser).then(function (addedUser) {

                    // if user signed up successfully
                    if (!!addedUser && !!addedUser._id) {

                        // update current user in root scope
                        rootScope.curUser = addedUser;

                        // navigate to dashboard
                        state.go("dashboard");
                    }

                }, function (error) {
                    if (error.message && error.message.search("duplicate key error")) {
                        alert("Email already used, please try another one");
                    }
                });
            }
        };
    }

    // define partials module
    angular.module("auth.module")

        // attaching the controller to the module
        .controller("RegisterController", ["$rootScope", "$state", "auth", "validate", RegisterController]);
} ());