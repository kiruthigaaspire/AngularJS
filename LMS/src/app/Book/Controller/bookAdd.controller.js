angular.module('app.book').
controller( 'bookAddController', 
  function BookAddController($scope, $stateParams, $state, Book) {
    $scope.editable = false;
    
    $scope.update = function() {
        Book.save($scope.book);
        $state.go('bookManage');
    };
   
  }
);