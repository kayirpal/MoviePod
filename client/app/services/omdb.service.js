(function() {
    "use strict";
    
    // define service
    function Service(api) {
        
        var omdb = this;
        
    }
    
    // define services module
    angular.module("services.module")
    
    // attach service to module
    .service("omdb", ["api", Service]);
}());