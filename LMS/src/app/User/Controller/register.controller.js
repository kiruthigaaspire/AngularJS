angular.module('app.user').
controller( 'registerController', function RegisterController($scope, $state, User) {
    $scope.isNotNew = false;
    $scope.update = function() {
        if ($scope.userForm.$valid) {
            User.register($scope.user);
            $state.go('login');
        }
    }; 
  }
);