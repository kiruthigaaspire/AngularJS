angular.module('app.home', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'home', {
	  url: '/home',
	  views: {
	    "main": {
	      templateUrl: 'Index/View/home.tpl.html'
	    }
	  },  
    });
  }
);