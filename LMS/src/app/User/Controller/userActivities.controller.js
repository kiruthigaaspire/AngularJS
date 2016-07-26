angular.module('app.user').
controller( 'userActivitiesController', 
  function UserActivitiesController($scope, User, $stateParams) {
    $scope.userActivities = User.unique({name: $stateParams.id});
  }
);