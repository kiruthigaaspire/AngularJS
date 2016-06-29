'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.ex1',
  'myApp.ex2',
  'myApp.ex3',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.directive("commentDirectiveTest", function() {
    return {
        restrict : "M",
        replace  : true,
        template : "<div style='align=middle'><h5>@Copy right 2016</h1></div>"
    };
})
;
