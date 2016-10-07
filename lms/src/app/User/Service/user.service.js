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
                if(response.errorStatus == false){
                    $scope.email = "";
                    $scope.password = "";
                    $scope.name = "";
                    $scope.address = "";
                    $scope.mobile = "";
                    $location.path('/registration');
                } 
            });
        },
        userEdit: function($scope, param) {
            console.log('edut service');
            data = {
                    'id' : param.id
                };
            console.log('edut service');
            apiServices.process("post", "userDetail", data).then(function(response){
                $scope.userData = response;
            });
        },
        updateUser: function($scope) {
            data = {
                'password' : $scope.password,
                'mobile' : $scope.userData.phone_no,
                'id' : $scope.userData.id
            };
            if ($rootScope.globals.authUser.isAdmin) {
                apiServices.process("post", "userUpdate", data).then(function(response){
                    $scope.error_status = response.errorStatus;
                    $scope.error_messages = response.errorMessage;
                });
            } else {
                $location.path('/login');
            }
        }
    };
}]);