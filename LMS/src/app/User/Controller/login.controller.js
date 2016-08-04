angular.module('app.user').
controller( 'loginController', function LoginController($scope, $rootScope, $state, User, UserAuth) {
    $scope.error = false;
    $scope.login = function() {
        User.login($scope.user, function(user){
            if(user.length === 0) {
                $scope.error = true;
                $scope.error_message = 'User name or password is incorrect';
            } else if(user[0].membership_status == 'Active'){
                if(user[0].is_admin) {
                    $rootScope.admin = true;
                } else {
                    $rootScope.admin = false;
                }
                UserAuth.SetCredentials(user[0].user_name, user[0].user_id, user[0].password);
                $state.go('home');
            } else {
            	$scope.error = true;
                $scope.error_message = 'User name is expired / not approved';
            }
        });
    };
  }
);
