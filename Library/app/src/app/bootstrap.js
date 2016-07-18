angular.element(document).ready(function() {
  bootstrap(app);
  document.body.setAttribute('ng-app', 'app');
});

var bootstrap = function(Application) {
  angular.bootstrap(document, ['gamaMobileApp']);
};
