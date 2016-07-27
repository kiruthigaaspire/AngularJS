angular.module('app').
directive('copyRight', function() {
    return {
        restrict : "AME",
        template: '<div>{{copyrightText}}</div>',
        replace: true
    };
});
