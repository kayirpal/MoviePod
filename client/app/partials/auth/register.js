(function () {
    "use strict";

    // controller definition 
    function RegisterController(rootScope, state, auth, validate) {
        var register = this;

        // new user details
        register.newUser = {};

        // create user
        register.createUser = function (newUser) {

            // reset validation message
            register.message = undefined;

            // check name
            if (!validate.isNonEmptyString(newUser.name)) {

                register.message = "We need to know your name";
                return;
            }

            // check email
            if (!validate.isValidEmail(newUser.email, newUser)) {

                register.message = "Provided email is invalid";
                return;
            }

            // check email
            if (!validate.isNonEmptyString(newUser.password)) {

                register.message = "You must set a password";
                return;
            }

            // confirm password
            if (newUser.cPassword !== newUser.password) {
                newUser.unmatchedPassword = true;                
                register.message = "Password not confirmed";
                return;
            }

            // all good, add user
            auth.createUser(newUser).then(function (addedUser) {

                // if user signed up successfully
                if (!!addedUser && !!addedUser._id) {

                    // update current user in root scope
                    rootScope.curUser = addedUser;

                    // save in session storage
                    auth.startSession(addedUser);

                    // navigate to dashboard
                    state.go("dashboard");
                }

            }, function (error) {
                if (error.message && error.message.search("duplicate key error")) {
                    alert("Email already used, please try another one");
                }
            });

        };
    }

    // define partials module
    angular.module("auth.module")

        // attaching the controller to the module
        .controller("RegisterController", ["$rootScope", "$state", "auth", "validate", RegisterController]);
} ());