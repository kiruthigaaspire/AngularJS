angular.module('app.user', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'userRegistration', {
	  url: '/registration',
	  views: {
	    "main": {
	      controller: 'userRegistrationController',
	      templateUrl: 'User/View/registration.tpl.html'
	    }
	  },  
    }).state( 'login', {
	  url: '/login',
	  views: {
	    "main": {
	      controller: 'loginController',
	      templateUrl: 'User/View/login.tpl.html'
	    }
	  },  
    }).state( 'forgot_password', {
	  url: '/forgot_password',
	  views: {
	    "main": {
	      controller: 'forgotPasswordController',
	      templateUrl: 'User/View/forgot_password.tpl.html'
	    }
	  },  
    });
  }
);