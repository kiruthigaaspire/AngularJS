angular.module('app.user').
controller( 'registerController', function RegisterController($stateParams, $scope, $state, User) {
    $scope.update = function() {
        console.log($scope.user);
        User.register($scope.user);
//        $state.go('login');
    }; 
  }
);