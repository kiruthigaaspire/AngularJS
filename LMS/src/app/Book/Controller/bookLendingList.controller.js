angular.module('app.book').
controller( 'bookLendingListController', 
  function BookLendingListController($scope, Library) {
	$scope.lendingBooks = Library.query();
  }
);