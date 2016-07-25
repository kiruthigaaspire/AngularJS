angular.module('app').
  directive('mobile', function() {
      return {
          require: "ngModel",
          restrict : "A",
          link: function(scope, element, attrs, ngModel) {
              scope.$watch(attrs.ngModel, function(value) {
                  var strongRegex = new RegExp("^[1-9]{1}[0-9]{9}$");
                  if (strongRegex.test(value)) {
                      ngModel.$setValidity("mobile", true);
                  } else {
                      ngModel.$setValidity("mobile", false);
                  }
              });
          }
      };
  });
