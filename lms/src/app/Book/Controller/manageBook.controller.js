angular.module('lms.book').
controller('manageBookController',
     function manageBookController($scope, Book, $state, auth) {  
          if (auth.isLoggedIn()) {
               Book.library(function(books) {
                    $scope.books = books;
                    $scope.bookDetails = [];
                    angular.forEach($scope.books, function(key, value) {
                        Book.get({id : key.book_id}, function(book) {
                            $scope.bookDetails[book.id] = book;
                         });
                    });
               });
          } else {
               $state.go('login');
          }
     }
);
