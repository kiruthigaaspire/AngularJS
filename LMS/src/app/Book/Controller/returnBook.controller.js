angular.module('app.book').
controller( 'returnBookController', 
  function ReturnBookController($scope, Library) {
	Library.returnBook({user_id: $rootScope.globals.currentUser.userid, book_id: $stateParams.book_id});
	$state.go('bookManage');
  }
);