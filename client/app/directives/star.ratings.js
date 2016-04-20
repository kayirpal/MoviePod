(function () {
    "use strict";

    // directive definition
    var directive = function () {

        // return direcive definition
        return {

            // only attribute and Elements directives
            restrict: "EA",

            scope: {
                onUpdate: "="
            },

            // linking function
            link: function (scope, element, attr) {

                // get maximum value
                var max = Number(attr.max || 10);

                var diff;

                // get score value
                var score = Number(attr.score || 0);

                // score out of 5
                score = (score / max) * 10;

                // if score is more than 10
                if (score > 10) {
                    score = 0;
                } else {
                    // get nearest integer                     
                    score = Math.round(score);
                }

                // add stars
                for (max = 1; max <= 10; max++) {

                    // score difference
                    diff = score - max;

                    if (diff >= 0) {
                        element.append('<span class="star fa fa-star" starno="' + max + '"></span>');
                    } else {
                        element.append('<span class="star fa fa-star-o" starno="' + max + '"></span>');
                    }
                }

                element.find("span").on("click", function (event) {

                    var curRating = this.getAttribute("starno");

                    if (!!curRating) {
                        curRating = Number(curRating);

                        if (this.className === 'star fa fa-star') {
                            curRating -= 1;
                        }
                        
                        // update stars
                        $(element).find("span").each(function (index) {
                            var curSpanRating = this.getAttribute("starno");
                            
                            if (!!curSpanRating) {
                                
                                curSpanRating = Number(curSpanRating);
                                
                                if (curRating >= curSpanRating) {
                                    this.className = 'star fa fa-star';
                                } else {
                                    this.className = 'star fa fa-star-o';
                                }
                            }

                        });

                        if (scope.onUpdate && typeof scope.onUpdate === "function") {
                            scope.onUpdate(curRating);
                        }

                    }

                });

            }
        };

    };

    // define directives module
    angular.module("directives.module")

        // attach directive to module
        .directive("starRating", directive);
} ());