angular.module('app.login', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'Login', {
	  url: '/login',
	  views: {
	    "main": {
	      controller: 'loginController',
	      templateUrl: 'Login/View/login.tpl.html'
	    }
	  },  
    });
  }
);
