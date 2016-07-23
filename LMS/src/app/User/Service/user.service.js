angular.module('app.user').
  factory('User', ['$resource',
    function($resource) {
      return $resource('http://localhost/LMS_backend/src/Login/Services/login.php', {}, {
          login: {
              method: 'GET',
              isArray: true
            },
          register: {
              method: 'POST'
            },
          update: {
              method: 'PUT'
            }
      });
    }
  ]);
