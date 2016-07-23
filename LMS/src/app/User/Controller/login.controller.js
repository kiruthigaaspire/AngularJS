angular.module('app.user').
controller( 'loginController', function LoginController($stateParams, $scope) {
    $scope.login = function() {
        console.log($scope.user);
    };
  }
);