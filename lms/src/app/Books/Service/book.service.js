angular.module('app.books').factory('bookService', ['$http', '$rootScope', 'apiServices', '$location', function ($http, $rootScope, apiServices, $location) {
    return {
        bookList: function($scope) {
            data = {
                'user_id' :  $rootScope.globals.authUser.user_id
            };
            
            apiServices.process("post", "bookList", data).then(function(response){
                $scope.bookList = response.book;
            });
        }, 
        mybookList: function($scope) {
            data = {
                'user_id' :  $rootScope.globals.authUser.id
            };
            
            apiServices.process("post", "mybookList", data).then(function(response){
                $scope.bookList = response.book;
            });
        }, 
        viewBook: function($scope, param) {
            data = {
                'id' : param.id
            };
            
            apiServices.process("post", "bookView", data).then(function(response){
                $scope.bookData = response.bookData;
                $scope.users = response.users;  
            });
        },
        lendBook: function($scope, book, user) {
            data = {
                'book_id' : book.id,
                'user_id' : user.id
            };
            
            apiServices.process("post", "bookLend", data).then(function(response){
                if(response.errorMsg === "Ok") {
                    $location.path('/books');
                }
            });
        },
        approveBook: function($scope, book) {
            data = {
                'book_id' : book.id,
                'user_id' : book.user_id
            };
            
            apiServices.process("post", "bookApprove", data).then(function(response){
                if(response.errorMsg === 'Ok') {
                    $location.path('/books');
                }
            });
        },
        rejectBook: function($scope, book) {
            data = {
                    'book_id' : book.id,
                    'user_id' : book.user_id
                };
            
            apiServices.process("post", "bookReject", data).then(function(response){
                $location.path('/books');
                
            });
        },
        addBook: function($scope) {
            data = {
                'book_name' : $scope.bName,
                'author_name' : $scope.bAuthorName,
                'book_code' : $scope.bCode,
                'number_of_books' : $scope.bNoBooks,
                'price' : $scope.bPrice,
                'rack_no' : $scope.bRackNumber,
            };
            if ($rootScope.globals.authUser.isAdmin) {
                apiServices.process("post", "bookAdd", data).then(function(response){
                    $location.path('/books');
                });
            } else {
                $location.path('/login');
            }
        }
    };
}]);
