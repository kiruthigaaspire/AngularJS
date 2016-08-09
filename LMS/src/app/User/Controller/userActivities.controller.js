angular.module('app.user').
controller( 'userActivitiesController', 
  function UserActivitiesController($scope, Library, $stateParams) {
    $scope.userActivities = Library.query({user_id: $stateParams.id});
  }
);