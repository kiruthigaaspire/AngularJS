'use strict';

angular.module('myApp.ex3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ex3', {
    templateUrl: 'ex3/ex3.html',
    controller: 'Ex3Ctrl'
  });
}])
.directive("classDirectiveTest", function() {
    return {
        restrict : "C",
        template : "<h1>My class directive!</h1>"
    };
})
.controller('Ex3Ctrl', function() {    
 
});
