angular.module('lms.user')
.service('session', function ($log, localStorage) {

     this._user = JSON.parse(localStorage.getItem('session.user'));
     this._accessToken = JSON.parse(localStorage.getItem('session.accessToken'));

     this.getUser = function() {
          return this._user;
     };
     
     /**
      * set user details in localstorage
      * @param {object} user
      * @returns {session.service_L2}
      */
     this.setUser = function(user) {
          this._user = user;
          localStorage.setItem('session.user', JSON.stringify(user));
          
          return this;
     };

     /**
     * Destroy session
     */
     this.destroy = function destroy() {
          this.setUser(null);
          this.setAccessToken(null);
     };
     
     this.getAccessToken = function() {
          return this._accessToken;
     };

     this.setAccessToken = function(token){
          this._accessToken = token;
          localStorage.setItem('session.accessToken', token);
          return this;
     };

});
