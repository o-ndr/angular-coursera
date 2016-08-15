'use strict';
angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  
  
  // now, query the service and get hold of the dishes data from the service.
  // to do the above, introduce a new statement like this:

  $scope.dishes= menuFactory.getDishes();
  //above: calling the getDishes method of the menuFactory that is going to return
  // the dishes object, and then we put that dishes object onto the scope.

  // dependency injection:
  // now we need to inject the service into this controller.
  // "introducing the sevice through dependency injection:" put 'menuFactory' after the scope, i.e.:
  // .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  // then after the scope add the mae of the function without the quotes



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

            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
                               var channels = [{value:"tel", label:"Tel."}, {value:
                           "Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])

.controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

.controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {


  // replace the var dish={ variable with the call to the factory
  // that supplies the dish information:

            var dish= menuFactory.getDish(parseInt($routeParams.id,10));

            $scope.dish = dish;
            
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
                  $scope.mycomment = {rating:5, comment:"", author:"", date:""};
                               
                 
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                                
                $scope.dish.comments.push($scope.mycomment);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }]); 