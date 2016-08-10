angular.module('app.book').
controller( 'bookListController', 
  function BookListController($scope, Book, $rootScope, Library) {
	$scope.bookList = Book.query();
	$scope.userBooks = [];
	Library.query({user_id: $rootScope.globals.currentUser.userid}, function(book) {
	    angular.forEach(book, function(key,value) {
	    	$scope.userBooks[key.book_id] = key.lending_status;
	    }, $scope.userBooks);
    });
  }
);