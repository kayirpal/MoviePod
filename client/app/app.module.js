(function() {
    "use strict";
    
    // define main module
    angular.module("app", [
        "ui.router",
        "common.module",
        "directives.module",
        "services.module",
        "auth.module",
        "dashboard.module"]);
}());