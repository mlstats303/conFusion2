'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            $scope.dishes= menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedbacks().create($scope.feedback);
                    $scope.feedbackForm.$setPristine();
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.dish = {};
            $scope.showDish = false;
            $scope.message = "Loading ...";
            $scope.predicate = '';

            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                    function(response) {
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response){
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                $scope.mycomment.rating = parseInt($scope.mycomment.rating);
                console.log($scope.mycomment);

                $scope.dish.comments.push($scope.mycomment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory,
                                                                                             corporateFactory) {
            $scope.dish = {};
            $scope.showDish = false;
            $scope.showPromo = false;
            $scope.showChef = false;
            $scope.message = "Loading ...";

            menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response) {
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );

            menuFactory.getPromotion(0)
                .$promise.then(
                    function(data) {
                        $scope.promotion = data;
                        $scope.showPromo = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
            );

            corporateFactory.getLeader(3)
                .$promise.then(
                function(data){
                    $scope.execchef = data;
                    $scope.showChef = true;
                },
                function(response){
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

            $scope.showLeaders = false;
            $scope.message = "Loading ...";

            corporateFactory.getLeaders()
                .query(
                    function(data) {
                        $scope.leaders = data;
                        $scope.showLeaders = true;
                    },
                    function(response){
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
        }]);
