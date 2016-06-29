var myapp = angular.module("directiveApp", []);
myapp.controller('DirectiveController', ['$scope', function($scope) {
  $scope.copyrightYear = new Date().getFullYear();
  $scope.copyrightText = '\u00A9 Copyright' + $scope.copyrightYear + '. All Rights Reserved.';
}]);
myapp.directive('copyRight', function() {
    var directive = {};
    directive.restrict = 'AME';
    directive.template = '<div>{{copyrightText}}</div>';
    directive.replace = true;
    return directive;
});    
