angular.module('lms.book').
controller('detailBookController',
     function detailBookController($scope, $state, $stateParams, Book) {
          $scope.bookDetail = Book.get({'id': $stateParams.id});
     }
);
