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
    })
    .state( 'userManage', {
        url: '/user/manage',
        views: {
          "main@": {
            controller: 'userMainController',
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@userManage": {
            controller: 'userListController',
            templateUrl: 'User/View/list.tpl.html'
          }
        },  
      })
      .state( 'userConfirm', {
        url: '/user/changeStatus/:id',
        views: {
            "main@": {
                controller: 'userMainController',
                templateUrl: 'Index/View/home.tpl.html'
              },
            "mainContent@changeStatus": {
              controller: 'changeStatusController',
              template: ' '
            }
          }, 
      })
      .state( 'userActivity', {
        url: '/user/activities/:id',
        views: {
            "main@": {
                controller: 'userMainController',
                templateUrl: 'Index/View/home.tpl.html'
              },
            "mainContent@userActivity": {
              controller: 'userActivitiesController',
              templateUrl: 'User/View/activity.tpl.html'
            }
          }, 
      });
  }
);
