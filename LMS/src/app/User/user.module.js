angular.module('app.user', [
  'ui.router',
  'ui.bootstrap'
]).config(
  function config($stateProvider) {
    $stateProvider.state( 'login', {
	  url: '/login',
	  views: {
	    "main": {
	      controller: 'loginController',
	      templateUrl: 'User/View/login.tpl.html'
	    }
	  },
	  data: {
	      pageTitle: 'Login'
	  }
    })
    .state('register', {
      url: '/register',
      views: {
        "main": {
          controller: 'registerController',
          templateUrl: 'User/View/register.tpl.html'
        }
      },
      data: {
          pageTitle: 'Register'
      }
    });
  }
);
