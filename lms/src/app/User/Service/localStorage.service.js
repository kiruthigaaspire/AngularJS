angular.module('lms.user')
.factory('localStorage', function localStorageServiceFactory($window) {
     if ($window.localStorage){
          return $window.localStorage;
     }
          throw new Error('Local storage support is needed');
});
