angular.module('app.book').
controller( 'bookEditController', 
  function BookEditController($scope, $stateParams, $state, Book) {
    $scope.editable = true;
    var bookDetails;
    Book.query({id : $stateParams.id}, function(book) {
        $scope.book = book[0];
    });
    
    $scope.update = function() {
        Book.update($scope.book);
        $state.go('bookManage');
    };
   
  }
);