angular.module('app.login').
  factory('Login', ['$resource',
    function($resource) {
      return $resource('https://localhost/LMS_backend/src/Login/Service/login.php', {}, {
        query: {
          method: 'POST',
          params: {user: 'admin', password:  'admin'},
          isArray: true
        }
      });
    }
  ]);
