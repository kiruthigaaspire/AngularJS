angular.module('lms.user').
controller('listUserController',
     function listUserController($scope, $state, User, auth) {
          if (auth.isLoggedIn()) {
               $scope.users = User.query();

               $scope.divShow = "div1";

               $scope.show = function(arg) {
                  $scope.divShow = arg;
                };
          } else {
               $state.go('login');
          }
     }
);
