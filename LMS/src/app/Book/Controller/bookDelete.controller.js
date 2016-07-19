angular.module('app.book').
controller( 'bookDeleteController', 
  function BookDeleteController($scope, $stateParams, $state, Book) {
    var bookDetails = Book.delete({id : $stateParams.id});
    $state.go('bookManage');
  }
);