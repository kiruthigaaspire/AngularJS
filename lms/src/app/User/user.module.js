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
                              }).state( 'userLogin', {
                                url: '/userlogin',
                                views: {
                                  "main": {
                                    controller: 'userLoginController',
                                    templateUrl: 'User/View/login.tpl.html'
                                  }
                                },
                              }).state( 'userLogOff', {
                                url: '/userlogOff',
                                views: {
                                  "main": {
                                    controller: 'userLogOffController',
                                    templateUrl: 'User/View/login.tpl.html'
                                  }
                                },  
                              }).state( 'userEdit', {
                                  url: '/user/edit/:id',
                                  views: {
                                    "main": {
                                      controller: 'userRegistrationController',
                                      templateUrl: 'User/View/userEdit.tpl.html'
                                    }
                                  },  
                              });
                            }
                          );