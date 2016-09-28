angular.module('lms.book').
controller( 'editBookController', 
     function editBookController($scope, $stateParams, $state, Book) {
          Book.get({id : $stateParams.id}, function(book) {
               book.price          = parseInt(book.price);
               book.code           = parseInt(book.code);
               book.rack           = parseInt(book.rack);
               book.quantity       = parseInt(book.quantity);
               book.status         = parseInt(book.status);
               book.arrivalDate    = new Date(book.arrivalDate); 

               $scope.book = book;
          });

          $scope.submitForm = function (isValid) {
               // check to make sure the form is completely valid
               if (isValid) {
                    Book.update($scope.book);
                    $state.go('bookList');
               }
          };   
     }
);