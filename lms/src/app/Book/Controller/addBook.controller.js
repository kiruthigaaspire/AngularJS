angular.module('lms.book').
controller('addBookController',
     function addBookController($scope, $state, Book) {
          $scope.status = 1;
          $scope.submitForm = function (isValid) {
               // check to make sure the form is completely valid
               if (isValid) {
                    Book.save($scope.book);  
                    $state.go('bookList');
               }
          };
     }
);
