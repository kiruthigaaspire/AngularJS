bookApp = angular.module('bookApp', []);

bookApp.controller('bookController',function($scope, $http) {
    $scope.submitted = false;
    $scope.originForm = angular.copy($scope.bookform);
    $scope.create = function(form) {
    if (form.$valid) {
        $http({
            method : 'POST',
            url : 'create_book.php',
            data : {
                name:$scope.book.book_name,
                status:$scope.book.status,
                author:$scope.book.author_name,
                quantity:$scope.book.quantity,
                roll_no:$scope.book.roll_no
                },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            $scope.data = response;
        });
    }
  };
});


