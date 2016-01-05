'use strict';

angular.module('confusionApp')
    .constant('baseURL', "http://localhost:3000/")
        .service('menuFactory',['$resource','baseURL', function($resource,baseURL) {
    
                this.getDishes = function () {
                    return $resource(baseURL+"dishes/:id",null, {'update':{method:'PUT'}});
                };

                // implement a function named getPromotion
                // that returns a selected promotion.
                this.getPromotion = function (index) {
                    return $resource(baseURL + "promotions/:id").get({id: index});
                }
                        
        }])

        .factory('corporateFactory', ['$resource','baseURL', function($resource,baseURL) {
    
            var corpfac = {};

            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
            corpfac.getLeaders = function (){
                return $resource(baseURL + "leadership");
            };

            corpfac.getLeader = function (index){
                return $resource(baseURL + "leadership/:id").get({id:index});
            };

            return corpfac;
    
        }])

        .factory('feedbackFactory', ['$resource','baseURL', function($resource,baseURL){
            var feedFac = {};

            feedFac.getFeedbacks = function (){
                return $resource(baseURL + "feedback",{}, {
                    query: {method: 'GET', isArray: true},
                    create: {method: 'POST'}
                });
            };

            return feedFac;
        }]);
