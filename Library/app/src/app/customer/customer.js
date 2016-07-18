angular.module( 'gamaMobileApp.customer', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'register', {
    url: '/register',
    views: {
      "main": {
        controller: 'RegisterController',
        templateUrl: 'customer/view/register/form.tpl.html'
      }
    },
    data:{ pageTitle: 'Login', pageCaption:'Registration',showBreadCrumb:true, breadCrumbLink:'login', showCart:false }
  });

  $stateProvider.state( 'forgot_password', {
    url: '/forgot_password',
    views: {
      "main": {
        controller: 'RegisterController',
        templateUrl: 'customer/view/forgot_password/form.tpl.html'
      }
    },
    data:{ pageTitle: 'Forgot Password', pageCaption:'Forgot Password',showBreadCrumb:true, breadCrumbLink:'login', showCart:false }
  });

   $stateProvider.state( 'change_password', {
    url: '/change_password',
    views: {
      "main": {
        controller: 'RegisterController',
        templateUrl: 'customer/view/change_password/form.tpl.html'
      }
    },
    data:{ pageTitle: 'Forgot Password', pageCaption:'Forgot Password',showBreadCrumb:true, breadCrumbLink:'myaccount', showCart:false }
  });

  $stateProvider.state( 'myaccount', {
    url: '/myaccount',
    views: {
      "main": {
        controller: 'RegisterController',
        templateUrl: 'customer/view/myaccount/form.tpl.html'
      }
    },
    data:{ pageTitle: 'My Profile', pageCaption:'My Profile', showBreadCrumb:true, breadCrumbLink:'books-list' }
  });

});

