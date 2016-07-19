angular.module('app.book').
controller( 'bookListController', 
  function BookListController($scope, Book) {
	$scope.bookList = Book.query();
  }
);