angular.module('lms.user').
controller('loginController',
     function loginController($scope, $state, auth, session) {
          $scope.loginErr = '';
          $scope.submitForm = function (isValid) {
               // check to make sure the form is completely valid
               if (isValid) {

                    var isNum = /^\d+$/.test($scope.user.info);
                    if (isNum) {
                         if ($scope.user.info.length !== 10) {
                              $scope.loginErr = "Please Enter Valid Mobile Number";
                              return false;
                         }
                         $scope.user.infoType = 'mobile';
                    } else {
                         if ($scope.isEmailAddress($scope.user.info) === false) {
                          $scope.loginErr = "Please Enter Valid Email Address";
                          return false;
                         }
                         $scope.user.infoType = 'email';
                    }

                    var user = auth.logIn($scope.user);

                    user.then(function(data) {
                         if (data.error_code) {
                              $scope.loginErr = data.error_message;
                              $state.go('login');
                         } else {
                             session.setUser(data);
                             session.setAccessToken(data.access_token);
                             $state.go('bookList');
                         }
                    });
               }
          };

          $scope.isEmailAddress = function(email) {
               var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
               return pattern.test(email); 
          };
     }
);