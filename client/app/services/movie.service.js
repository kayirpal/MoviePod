(function() {
    "use strict";
    
    // define service
    function Service(api) {
        
        var movie = this;
        
    }
    
    // define services module
    angular.module("services.module")
    
    // attach service to module
    .service("movie", ["api", Service]);
}());