angular.module('app.user').
  factory('User', ['$resource',
    function($resource) {
      return $resource('http://localhost/LMS_backend/src/User/Services/user.php/user/:action/:user_id:user_name', {}, {
          query: {
              method: 'GET',
              params: {
                  action: "list"
              },
              isArray: true
          },
          register: {
              method: 'POST',
              params: {
                  action: 'new'
              }
          },
          update: {
              method: 'PUT',
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
                  action: "unique"
              },
              isArray: true
          },
          changeStatus: {
              method: 'PUT',
              params: {
                  action: 'status'
              }
          }
      });
    }
  ]);
