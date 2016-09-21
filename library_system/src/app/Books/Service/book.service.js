angular.module('app.books').factory('bookService', ['$http', '$rootScope', 'apiServices', '$location', function ($http, $rootScope, apiServices, $location) {
    return {
        bookList: function($scope) {
            data = {
                'user_id' :  $rootScope.globals.authUser.user_id
            };
            
            apiServices.process("post", "books.php?do=list", data).then(function(response){
                $scope.bookList = response.list;
                $scope.lendedBooks = response.lendedBooks;    
            });
        }, 
        viewBook: function($scope, param) {
            data = {
                'id' : param.id
            };
            
            apiServices.process("post", "books.php?do=view", data).then(function(response){
                $scope.bookData = response.bookData;
                $scope.lendedBooks = response.lendedBooks;
                $scope.users = response.users;  
            });
        },
        approve: function($scope, param) {
            data = {
                'id' : param.id,
                'book_id' : param.book_id
            };
            
            apiServices.process("post", "books.php?do=approve", data).then(function(response){
                $scope.lendedBooks = response.lendedBooks;
            });
        },
        returned: function($scope, param) {
            data = {
                'id' : param.id,
                'book_id' : param.book_id
            };
            
            apiServices.process("post", "books.php?do=returned", data).then(function(response){
                $scope.lendedBooks = response.lendedBooks;
            });
        },
        lend: function($scope, param) {
            data = {
                'user_id' : $rootScope.globals.authUser.is_admin == 1 ? $scope.user_id : $rootScope.globals.authUser.user_id,
                'book_id' : $scope.bookData.id,
                'added_by' : $rootScope.globals.authUser.is_admin == 1 ? 'admin' : 'user'
            };
            
            apiServices.process("post", "books.php?do=lend", data).then(function(response){
                if ($rootScope.globals.authUser.is_admin) {
                    $scope.lendedBooks = response.lendedBooks;
                } else {
                    if ($rootScope.globals.authUser.is_admin != 1) {
                        $location.path('/books');
                    }
                }
            });
        },
        addBook: function($scope) {
            data = {
                'name' : $scope.name,
                'author' : $scope.author,
                'code' : $scope.code,
                'no_of_books' : $scope.no_of_books,
                'price' : $scope.price,
                'description' : $scope.description
            };
            if ($rootScope.globals.authUser.is_admin) {
                apiServices.process("post", "books.php?do=add", data).then(function(response){
                    $location.path('/books');
                });
            } else {
                $location.path('/login');
            }
        }
    };
}]);