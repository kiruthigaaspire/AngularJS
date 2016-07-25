angular.module('app').
  directive('password', function() {
      return {
          require: "ngModel",
          restrict : "A",
          link: function(scope, element, attrs, ngModel) {
              scope.$watch(attrs.ngModel, function(value) {
                  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                  if (strongRegex.test(value)) {
                      ngModel.$setValidity("password", true);
                  } else {
                      ngModel.$setValidity("password", false);
                  }
              });
          }
      };
  });
