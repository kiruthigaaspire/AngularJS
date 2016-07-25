angular.module('app.user').
controller( 'userListController', 
  function UserListController($scope, User) {
    $scope.userList = User.query();
  }
);