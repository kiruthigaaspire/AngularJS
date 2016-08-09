angular.module('app.user').
  factory('User', ['$resource',
    function($resource) {
      return $resource('http://localhost/LMS_backend/src/User/Services/user.php/:action:name', {}, {
          query: {
              method: 'GET',
              isArray: true
          },
          register: {
              method: 'POST',
              params: {
                  action: 'newuser'
              }
          },
          update: {
              method: 'PUT'
          },
          login: {
              method: 'POST',
              params: {
                  action: "login"
              },
              isArray: true
          },
          unique: {
              method: 'GET',
              params: {
                  action: "uniqueCheck"
              },
              isArray: true
          },
          changeStatus: {
              method: 'PUT',
              params: {
                  action: 'changestatus'
              }
          }
      });
    }
  ]);
