(function () {
    "use strict";

    // define service
    function Service($q) {

        var api = this,
            baseUrl = "http://localhost:8888/api/";


        // request generator
        function ajax(method, url, data) {

            // create a deferred object to return 
            var deferred = $q.defer();

            if (url.search("http://") !== 0 && url.search("https://") !== 0) {
                url = baseUrl.concat(url);
            }

            var requestData = {
                url: url,
                type: method
            };

            // extra parameters for POST calls
            if (data) {
                requestData.data = data;
            }

            $.ajax(requestData).done(function (result) {

                // send result to calling method  
                deferred.resolve(result);

            }).fail(function (err) {

                //return back the error message in case of any failure
                deferred.reject(err);
            });

            // return the promise of the deferred object
            return deferred.promise;
        }


        // get all or one
        api.get = function (source, id) {

            // update source url
            var url = source.concat(id || "");

            return ajax("GET", url);
        };

        // create
        api.post = function (source, data) {
            return ajax("POST", source, data);
        };

        // update 
        api.put = function (source, id, data) {

            // update source url
            var url = source.concat(id);

            return ajax("PUT", url, data);
        };

        // delete 
        api.delete = function (source, id) {

            // update source url
            var url = source.concat(id);

            return ajax("DELETE", url);
        };

    }

    // define services module
    angular.module("services.module")

        // attach service to module
        .service("api", ["$q", Service]);

} ());