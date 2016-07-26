angular.module('app.user').
controller( 'userMainController', 
  function UserMainController($scope) {
    $scope.welcomeMessage = 'Welcome to Online Library';
  }
);