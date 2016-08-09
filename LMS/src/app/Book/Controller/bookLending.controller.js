angular.module('app.book').
controller( 'bookLendingController', 
  function BookLendingController($scope, $rootScope, $state, $stateParams, Library) {
    Library.save({user_id: $rootScope.globals.currentUser.userid, book_id: $stateParams.book_id});
	$state.go('bookManage');
  }
);