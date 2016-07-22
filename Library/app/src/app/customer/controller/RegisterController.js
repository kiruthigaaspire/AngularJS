/**
 * And of course we define a controller for our route.
 */
angular.module('gamaMobileApp.customer')

.controller(
    'RegisterController',
    function RegisterController($scope, $http, Auth,$location, $rootScope, domain, $state) {
      $scope.showRegisterForm = true;
      $scope.showForgotPasswordForm = true;
      $scope.showMyAccountForm = true;
      $scope.linktologin = false;
      $scope.messages = [];
      $scope.emailRegx = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
      $scope.mobileRegx = /^[1-9][0-9]+$/;
      $scope.linktoredirect = false;

      $scope.register = function() {
        $scope.message = [];
        if($scope.user === undefined) {
          $scope.message = '* All fields are mandatotary';
          $scope.errors = true;
        } else if($scope.user['name'] === null || $scope.user['name'] === '') { 
          $scope.errors = true;
          $scope.message = 'Please enter a name';
        } else if(!$scope.emailRegx.test($scope.user['email'])) { 
          $scope.errors = true;
          $scope.message = 'Please enter a valid email address';
        } else if(!$scope.mobileRegx.test($scope.user['mobile']) || $scope.user['mobile'].length != 10) {
            $scope.errors = true;
            $scope.message = 'Please enter a valid Mobile Number';
        } else if($scope.user['password'].length < 8) {
            $scope.message = 'Password should have atleast 8 characters';
            $scope.errors = true;
        } else if($scope.user['password'] != $scope.user['confirmation']) {
            $scope.message = 'Passwords should match each other';
            $scope.errors = true;
        }  else {
          $rootScope.loading = true;
          $http.post(domain+'/book_library/UserController.php/user', $scope.user)
            .success(function(data, status, headers, config) {
              $scope.showRegisterForm = false;
              $scope.errors = false;
              $scope.message = null;
              $scope.linktologin = true;
            }).error(function(data, status, headers, config) {
              $scope.errors = true;
              $scope.message = data['messages'];
              $scope.linktologin = false;
            }).finally(function () {
              //Hide loading spinner whether our call succeeded or failed.
              $rootScope.loading = false;
            });
        } 
      };

      $scope.forgotPassword = function(){
        if(!$scope.emailRegx.test($scope.forgotemail)) {
          $scope.errors = true;
          $scope.messages = ['Please enter a valid email address'];
        }else{
          $scope.errors = false;
          $scope.messages = '';
          var forgotemail = {forgotemail:$scope.forgotemail};
          $rootScope.loading = true;
          $http.post(domain+'/shop/api/rest/customer', forgotemail)
          .success(function(data, status, headers, config) {              
            if(data.message=='success' || data.message==='success' ){ 
              $scope.showForgotPasswordForm = false;
              $scope.errors = false;                
              $scope.messages = [];
              $scope.linktologin = true;
            }else if(data.message=='nouser'){
              $scope.showForgotPasswordForm = true;
              $scope.errors = true;                
              $scope.messages = ['This email id is not register, check with your email id'];
              $scope.linktologin = false;
              $scope.forgotemail = '';
            }else{ 
              $scope.showForgotPasswordForm = true;
              $scope.errors = true;                
              $scope.messages = ['Please try once again'];
              $scope.linktologin = false;
              $scope.forgotemail = '';
            }              
          }).error(function(data, status, headers, config) {
            $scope.showForgotPasswordForm = true;
            $scope.errors = true;
            $scope.linktologin = false;            
            var messages = [];
            angular.forEach(data.messages.error, function(error, key) {
              if (error.code != 500) {
                this.push(error.message);
              }
            }, messages);
            $scope.messages = messages;
            $scope.forgotemail = '';
          }).finally(function () {
            //Hide loading spinner whether our call succeeded or failed.
            $rootScope.loading = false;                     
          });
        }
      };

      $scope.changePasswordLocation=function()
      {
       	$location.path('change_password');
      };

      $scope.change_password=function() {
              $scope.messages = [];
              if($scope.updateuser['currentpassword']==='' && $scope.updateuser['confirmation']==='' && $scope.updateuser['newpassword']===''){
                 $scope.message = 'All fields are mandatotary';
                 $scope.errors = true;

              }else if($scope.updateuser['currentpassword'].length < 8 ) {
                    $scope.message = 'Current password should have  8 or above characters';
                    $scope.errors = true;
              } else if($scope.updateuser['newpassword'].length < 8) {
                    $scope.message = 'New password should have atleast 8 characters';
                    $scope.errors = true;
              } 
              else if($scope.updateuser['confirmation'].length < 8 ) {
                    $scope.message = 'Confirmation password should have atleast 8 characters';
                    $scope.errors = true;
              }  
              else if($scope.updateuser['newpassword'] != $scope.updateuser['confirmation']) {
                    $scope.message = 'Passwords should match each other';
                    $scope.errors = true;
              } else if($scope.updateuser['newpassword'] === $scope.updateuser['currentpassword']) {
                    $scope.message = 'Current Password and New Passwords cannot be same';
                    $scope.errors = true;
              }  else {
                
                 var updateuserInfo = {
									 		oldpassword:$scope.updateuser['currentpassword'],
									 		newpassword:$scope.updateuser['newpassword'],
									 		id:$scope.customerId,
									 		email:$scope.customerEmail
								 };
                 $rootScope.loading = true;
                 $http.post(domain+'/book_library/UserController.php/user/updatepwd', updateuserInfo)
                 .success(function(data, status, headers, config) { 
 					         $scope.message = data['messages'];
            }).error(function(data, status, headers, config) {
                $scope.showMyAccountForm = true;
                $scope.errors = true;
                $scope.message = data['messages'];
                $scope.linktoredirect = false;
            }).finally(function () {
              //Hide loading spinner whether our call succeeded or failed.
              $rootScope.loading = false;
            });
          }
      };      
      
      $scope.updateUserName= function(){ 
        $scope.messages = [];
        if($scope.updateuser['username'] === null || $scope.updateuser['username'] === '' ) { 
            $scope.messages = ['User Name Cannot be empty'];
            $scope.errors = true;
        }
        else {
            var updateuserInfo = { 
							id:$scope.customerId,
							email:$scope.customerEmail,
							name:$scope.updateuser['username'],
							address:$scope.updateuser['address']
							};
            $rootScope.loading = true;
            $http.post(domain+'/book_library/UserController.php/user/update', updateuserInfo)
              .success(function(data, status, headers, config) { 
									alert(data['messages']);
                  $rootScope.loginUser = username = $scope.updateuser['username'];
                  document.cookie="loginUser="+username+";";
                  document.cookie="customeraddress="+$scope.updateuser['address']+";";
                  
            }).error(function(data, status, headers, config) {
                $scope.showMyAccountForm = true;
                $scope.errors = true;
                $scope.messages = data['messages'];
                $scope.linktoredirect = false;
            }).finally(function () {
              //Hide loading spinner whether our call succeeded or failed.
              $rootScope.loading = false;
            });
        }
      };
      
      $scope.getAllUsers = function() {
		/*		if (sessionStorage.getItem('usersList')) {
            $rootScope.usersList = JSON.parse(sessionStorage.getItem('usersList'));
            sessionStorage.removeItem('usersList');
         } else {*/
            $rootScope.loading = true; 
            $http.get(domain+'/book_library/UserController.php/users').success(
                function(data, status, headers, config) {
                    $rootScope.usersList = data;
                    sessionStorage.setItem('usersList', JSON.stringify(data));                 
            }).finally(function () {
                  $rootScope.loading = false;                     
            });
         //}
			};
			
			$scope.approverejectUser = function(user, status ) {
				user['status'] = status;
				$rootScope.loading = true;
				$http.post(domain+'/book_library/UserController.php/user/approvereject', user)
					.success(function(data, status, headers, config) { 
							alert(data['messages']);
							$state.reload();
				}).error(function(data, status, headers, config) {
						$scope.errors = true;
						$scope.messages = data['messages'];
				}).finally(function () {
					$rootScope.loading = false;
				});
			};
      
    });
