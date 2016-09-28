angular.module('lms.user').
     controller('registerController',
          function registerController($scope, $state, $stateParams, User, auth) {
               $scope.isExist = 0;
               $scope.uniqueMsg = '';
               $scope.submitForm = function (isValid) {
                    // check to make sure the form is completely valid
                    if (isValid && $scope.isExist === 0) {
                         User.register($scope.user);  
                         $state.go('login');
                    }
               };
               
               $scope.unique = function(value, entity) {
               
                    if (value) {
                         User.unique({entity: entity, value: value}, function (data) {
                              $scope.isExist = data.unique;
                               if ($scope.isExist > 0) {
                                   $scope.uniqueMsg = entity + " already exist. Please Choose different";
                              } else {
                                  $scope.isExist = 0; 
                                  $scope.uniqueMsg = '';
                              }
                         });

                         return false;
                    }
                    
               };
          }
     );