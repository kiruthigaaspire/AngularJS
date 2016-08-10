angular.module('app.book').
controller( 'bookLendingListController', 
  function BookLendingListController($scope, $rootScope, Library) {
	$scope.lendingBooks = Library.query();
  }
);