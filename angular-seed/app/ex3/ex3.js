'use strict';

angular.module('myApp.ex3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ex3', {
    templateUrl: 'ex3/ex3.html',
    controller: 'Ex3Ctrl'
  });
}])
.directive("directiveTest", function() {
    return {
        restrict : "M",
        replace  : true,
        template : "<h1>My directive!</h1>"
    };
})
.controller('Ex3Ctrl', function() {    
 
});
