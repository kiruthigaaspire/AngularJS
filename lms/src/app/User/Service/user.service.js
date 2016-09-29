angular.module('app.user').factory('userService', ['$http', '$rootScope', '$location', 'apiServices', function ($http, $rootScope, $location, apiServices) {
    return {
        loginForm: function($scope) {
            data = {
                'email' : $scope.email,
                'password' : $scope.password
            };
            
            apiServices.process("post", "userLogin", data).then(function(response){
                $scope.error_status = response.errorStatus;
                $scope.error_messages = response.errorMessage;
                if(response.errorMessage == "Ok"){
                    console.log('logIn');
                    $rootScope.globals = {
                        authUser: response.user
                    };
                    $location.path('/books');
                } 
            });
        },
        logout: function($scope) {
            data = {};
            apiServices.process("post", "userLogOff", data).then(function(response){
                console.log('logoff');
                $rootScope.globals = {};
                $scope.message_type = response.errorStatus;
                $scope.messages = response.errorMessage;
            });
        },
        regForm: function($scope) {
            data = {
                'email' : $scope.reg_email,
                'password' : $scope.reg_password,
                'name' : $scope.reg_name
            };
            
            apiServices.process("post", "userRegistration", data).then(function(response){
                $scope.message_type = response.errorStatus;
                $scope.messages = response.errorMessage;
                $scope.reg_email = "";
                $scope.reg_password = "";
                $scope.reg_name = "";
            });
        }
    };
}]);