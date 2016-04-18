(function() {
    "use strict";
    
    // controller definition 
    function RegisterController() {
        var register = this;
    }
    
    // define partials module
    angular.module("auth.module")
    
    // attaching the controller to the module
    .controller("RegisterController", [RegisterController]);
}());