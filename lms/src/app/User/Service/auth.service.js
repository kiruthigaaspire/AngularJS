angular.module('lms.user')
.service('auth', function ($http, $state, session, domain) {
     
    /**
    * Check whether the user is logged in
    * @returns boolean
    */
     this.isLoggedIn = function isLoggedIn() {
          return session.getUser() !== null;
     };
    
    
    /**
    * Log in
    *
    * @param credentials
    * @returns {*|Promise}
    */
    this.logIn = function(credentials) {
          return $http
               .post(domain + '/user/login', credentials)
               .then(function(response) {
                    return response.data; 
               });
    };
    
    /**
    * Log out
    *
    * @returns {*|Promise}
    */
     this.logOut = function() {
          // Destroy session in the browser
          session.destroy();
          $state.go('login');
     };
    

});
