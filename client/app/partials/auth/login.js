(function() {
    "use strict";
    
    // controller definition 
    function LoginController() {
        var login = this;
    }
    
    // define partials module
    angular.module("auth.module")
    
    // attaching the controller to the module
    .controller("LoginController", [LoginController]);
}());