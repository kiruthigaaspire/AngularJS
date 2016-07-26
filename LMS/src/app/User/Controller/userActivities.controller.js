angular.module('app.user').
controller( 'userActivitiesController', 
  function UserActivitiesController($scope, User) {
    $scope.userList = User.query();
  }
);