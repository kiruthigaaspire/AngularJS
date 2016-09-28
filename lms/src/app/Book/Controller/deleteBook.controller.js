angular.module('lms.book').
controller('deleteBookController',
     function deleteBookController($scope, $state,  $stateParams, Book, $window) {
          var deleteBook= $window.confirm('Are you sure you want to delete this book?');
          if (deleteBook) {
              $scope.books = Book.delete({id : $stateParams.id});                  
          }

          $state.go('bookList');
     }
);
