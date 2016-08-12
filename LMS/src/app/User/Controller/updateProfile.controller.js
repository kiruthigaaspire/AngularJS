angular.module('app.user').
controller( 'updateProfileController', 
  function UpdateProfileController($scope, $stateParams, $state, User) {
    $scope.editable = true;
    var userDetails;
    User.query({user_id: $stateParams.user_id}, function(user) {
        $scope.user = user[0];
    });
    
    $scope.update = function() {
        User.update($scope.user);
        $state.go('home');
    };
   
  }
);