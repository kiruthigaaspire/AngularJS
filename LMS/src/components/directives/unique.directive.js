angular.module('app').
  directive('unique', function(User) {
      return {
          require: "ngModel",
          restrict : "A",
          link: function(scope, element, attrs, ngModel) {
              scope.$watch(attrs.ngModel, function(value) {
                  User.unique({name: value}, function(name){
                      if (name.length === 0) {
                          ngModel.$setValidity("unique", true);
                      } else {
                          ngModel.$setValidity("unique", false);
                      }
                   });
              });
          }
      };
  });
