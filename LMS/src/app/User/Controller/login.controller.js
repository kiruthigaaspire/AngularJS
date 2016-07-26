angular.module('app.user').
controller( 'loginController', function LoginController($scope, $state, User) {
    $scope.error = false;
    $scope.login = function() {
        User.login($scope.user, function(user){
            if(user.length === 0) {
                $scope.error = true;
                $scope.error_message = 'User name or password is incorrect';
            } else {
                if(user[0].is_admin) {
                 // Authentication
                    $state.go('home');
                } else {
                 // Authentication
                  $state.go('book');
                }
            }
        });
    };
  }
);