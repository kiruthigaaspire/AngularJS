var myApp = angular.module('formExample', []);

myApp.controller('formController', [ '$scope', function($scope) {
    $scope.master = {};
    $scope.update = function(book) {
        $scope.master = angular.copy(book);
    };
} ]);