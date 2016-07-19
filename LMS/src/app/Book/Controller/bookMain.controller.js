angular.module('app.book').
controller( 'bookMainController', 
  function BookMainController($scope) {
    $scope.welcomeMessage = 'Welcome to Online Library';
  }
);