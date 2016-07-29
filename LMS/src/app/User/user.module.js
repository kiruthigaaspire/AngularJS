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
            templateUrl: 'Index/View/home.tpl.html'
          },
          "mainContent@userManage": {
            controller: 'userListController',
            templateUrl: 'User/View/list.tpl.html'
          }
        },
        data: {
            pageTitle: 'User Manage'
        }  
      })
      .state( 'userConfirm', {
        url: '/user/changestatus/:id',
        views: {
            "main@": {
                templateUrl: 'Index/View/home.tpl.html'
              },
            "mainContent@userConfirm": {
              controller: 'changeStatusController',
              template: ' '
            }
          },
          data: {
              pageTitle: 'User Status - Confirm'
          } 
      })
      .state( 'userActivity', {
        url: '/user/activities/:id',
        views: {
            "main@": {
               templateUrl: 'Index/View/home.tpl.html'
             },
            "mainContent@userActivity": {
              controller: 'userActivitiesController',
              templateUrl: 'User/View/activity.tpl.html'
            }
          },
          data: {
              pageTitle: 'User - Activities'
          } 
      }).state( 'logout', {
    	  url: '/logout',
    	  views: {
    	    "main": {
    	      controller: 'logoutController',
    	      template: ' '
    	    }
    	  }
        });
  }
);
