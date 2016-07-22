/**
 * And of course we define a controller for our route.
 */
angular.module('gamaMobileApp.login')

.controller('LoginIndexController',
    function LoginIndexController($scope, $http, Auth, $location, $rootScope, domain) {
      $scope.showLoginForm = true;
      $scope.messages = [];

     
      $scope.emailRegx = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
      $scope.mobileRegx = /^[1-9][0-9]+$/;

      $scope.login = function() { 
        var isNum = /^\d+$/.test($scope.username);
        if(!$scope.username || !$scope.password) {
          $scope.messages = ['All fields are mandatory'];
          $scope.errors = true;
        } else if(isNum) {
          $scope.mobileValidate();
        } else {
          $scope.emailValidate();
        } 
      
        
        if($scope.messages.length === 0) {
          $rootScope.loading = true;
          Auth.userAuthenticate($scope.username, $scope.password).success(function(data, status, headers, config){
            //var  resHeader              = headers('Location').split('/');
            $scope.loginUser            = data['fname'];
            $rootScope.customerId   = customerId    = data['id'];
            $rootScope.customerEmail   = customerEmail = data['email'];
            $rootScope.customerMobile   = customerMobile = data['mobile']; 
            $rootScope.loginUser  = username   = $scope.loginUser; 
            $rootScope.role_id  = role_id   = data['role_id']; 
            $rootScope.customeraddress  = customeraddress   = data['address']; 
            
            $rootScope.loginStatus      = true;
            $rootScope.ismember = false;
            $rootScope.isAdmin = false;
            if( role_id == 2 ) {
	            $rootScope.ismember = true;
						}
						else if( role_id == 1 ) {
							$rootScope.isAdmin = true;
						}
            
            document.cookie="loginStatus=" + true + ";";
            document.cookie="loginUser="+username+";";
            document.cookie="customerId="+customerId+";";
            document.cookie="customerEmail="+customerEmail+";";
            document.cookie="customerMobile="+customerMobile+";";
            document.cookie="customerRole="+role_id+";";
            document.cookie="customeraddress="+customeraddress+";";
            
            
            $rootScope.showLogin        = false;  
            $scope.errors               = false;  
            $rootScope.showLogout       = true;  
            $location.path('books-list');
            $scope.messages              = ['Login Successful'];

          }).error(function(data, status, headers, config) {
            $scope.errors = true;
            $scope.info = false;
            //var messages = [];
            if (status != 500) {
							$scope.messages = [data['messages']];
						}
          }).finally(function () {
            //Hide loading spinner whether our call succeeded or failed.
            $rootScope.loading = false;
          });
        }
      }; 

      $scope.mobileValidate = function() {
        if(!$scope.mobileRegx.test($scope.username) || $scope.username.length != 10) {
          $scope.errors = true;
          $scope.messages = ['Please enter a valid Mobile Number'];
        } else {
            $scope.messages = [];
        }
      };

      $scope.emailValidate = function() {
        if(!$scope.emailRegx.test($scope.username)) {
          $scope.errors = true;
          $scope.messages = ['Please enter a valid email address'];
        } else {
            $scope.messages = [];
        }
      };

      $rootScope.logout = function() {
        Auth.clearCredentials().success(function(data, status, headers, config){
          //alert('Thank you'+$rootScope.loginUser+'for using Gama Gamma');
            $rootScope.loginUser        = 'Guest';
            $rootScope.loginStatus      = false;
            $rootScope.showLogin        = true;  
            $rootScope.showLogout       = false;
            $rootScope.customerEmail = null;
            $rootScope.customerMobile = null;
            document.cookie="loginStatus=" + false + ";";
            document.cookie="loginUser=Guest;";  
            document.cookie="customerId=null;";
            document.cookie="customerEmail=null;";
            document.cookie="customerMobile=null;"; 
            document.cookie="customeraddress=null;"; 
            $rootScope.cartItemsCount = 0;
            sessionStorage.removeItem('cartItems');
            sessionStorage.removeItem('cartItemsCount');
            sessionStorage.removeItem('selectedPickUpPointId');
            $location.path('/books-list');       
          });
        
      };

      $scope.register = function() {
        $location.path('register');
      };

      $scope.forgot_password = function() {
        $location.path('forgot_password');
      };

    });

