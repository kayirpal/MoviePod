(function() {
    "use strict";
    
    // define service
    function Service() {
        
        var validate = this;
       
       // is empty string
       validate.isNonEmptyString = function (source) {
           return !!source && typeof source === "string" && !!source.trim();
       };
        
       // validate email
       validate.isValidEmail = function (source, obj) {
           var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           var result =  regExp.test(source);
           
           if(obj){
               obj.invalidEmail = !result;
           }
           
           return result;
       };
    }
    
    // define services module
    angular.module("services.module")
    
    // attach service to module
    .service("validate", [Service]);
}());