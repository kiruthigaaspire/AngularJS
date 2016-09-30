angular.module('app.user').factory('userService', ['$http', '$rootScope', '$location', 'apiServices', function ($http, $rootScope, $location, apiServices) {
    return {
        loginForm: function($scope) {
            console.log($scope);
            data = {
                'email' : $scope.email,
                'password' : $scope.password
            };
            
            apiServices.process("post", "userLogin", data).then(function(response){
                $scope.error_status = response.errorStatus;
                $scope.error_messages = response.errorMessage;
                if(response.errorStatus == false){
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
                $scope.error_status = response.errorStatus;
                $scope.error_messages = response.errorMessage;
            });
        },
        registrationForm: function($scope) {
            data = {
                    'name' : $scope.name,
                    'email' : $scope.email,
                    'password' : $scope.password,
                    'address' : $scope.address,
                    'mobile' : $scope.mobile
                };
            
            apiServices.process("post", "userAdd", data).then(function(response){
                $scope.error_status = response.errorStatus;
                $scope.error_messages = response.errorMessage;
                $scope.reg_email = "";
                $scope.reg_password = "";
                $scope.reg_name = "";
                if(response.errorStatus == false){
                    $location.path('/registration');
                } 
            });
        }
    };
}]);