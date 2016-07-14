var bookApp = angular.module('bookApp', []);

bookApp.controller('listController', function($scope, $http) {
    $scope.list = function() {
        $http({
            method : 'GET',
            url : 'list_book.php',
            headers: {
                'content-type' : 'application/json'
            }
        }).success(function(response) {
        	$scope.bookList = response;
        })
    };
    $scope.list();
});
