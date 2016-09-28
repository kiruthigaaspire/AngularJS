angular.module('lms.user', [
  'ui.router',
  'ui.bootstrap',
  'angular.filter'
]).config(
     function config($stateProvider) {
          $stateProvider.state('registration', {
            url: '/register',
            views: {
              "main": {
                controller: 'registerController',
                templateUrl: 'User/View/register.tpl.html'
              }
            },
            data: {pageTitle: "User Registration" }
          }).state('login', {
            url: '/login',
            views: {
              "main": {
                controller: 'loginController',
                templateUrl: 'User/View/login.tpl.html'
              }
            },
             data: {pageTitle: "Login"}
          }).state( 'logout', {
           url: '/logout',
           views: {
             "main": {
               controller: 'logoutController',
               template: ''
                }
              },
               data: {pageTitle: "LogOut"}
           }).state('userList', {
            url: '/user',
            views: {
              "main": {
                controller: 'listUserController',
                templateUrl: 'User/View/list.tpl.html'
              }
            },
             data: {pageTitle: "User List"}
           }).state('editUser', {
            url: '/user/:id',
            views: {
              "main": {
                controller: 'editUserController',
                templateUrl: 'User/View/user.tpl.html'
              }
            },
             data: {pageTitle: "Edit User", permission : 'Admin'}
          }).state('deleteUser', {         
            url: '/user/:id',
            views: {
              "main": {
                controller: 'deleteUserController',
              }
            },
             data: {pageTitle: "User Delete", permission : 'Admin'}
          }).state('userDetails', {
            url: '/user/detail/:id',
            views: {
              "main": {
                controller: 'detailUserController',
                templateUrl: 'User/View/details.tpl.html'
              }
            },
             data: {pageTitle: "User Details"}
          }).state('approveUser', {
            url: '/user/:id',
            views: {
              "main": {
                controller: 'approveUserController',
              }
            },
             data: {pageTitle: "Edit User", permission : 'Admin'}
          });
     });