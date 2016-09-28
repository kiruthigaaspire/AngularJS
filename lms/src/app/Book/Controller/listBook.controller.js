angular.module('lms.book').
controller('listBookController',
     function listBookController($scope, Book, auth) {
         $scope.books = Book.query();
         $scope.lendingBooks = [];
         if ($scope.userRole === 'User') {
               Book.lendings({userId: $scope.userInfo.id}, function(book) {
                    angular.forEach(book, function(key, value) {
                        $scope.lendingBooks[key.book_id] = {status: key.status, id: key.id};
                    }, $scope.lendingBooks);
               });   
          }

          $scope.divShow = "div1";

          $scope.show = function(arg) {
               $scope.divShow = arg;
          };
     }
);
