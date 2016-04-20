(function() {
    "use strict";
    
    // declare app controller
    function AppController(rootScope, state,  auth) {
        
        // controller context
        var main = this;
        
        // logout
        main.logout = function() {
            
            // logout
            auth.logout();
            
            // reset current user
            rootScope.curUser = undefined;
            
            // redirect to login page
            state.go("login");
        };
    }   
    
    // main moduel
    angular.module("app")
    
    // define main controller
    .controller("AppController", ["$rootScope", "$state",  "auth", AppController]);
}());