var app = angular.module( 'gamaMobileApp', [
  'templates-app',
  'templates-common',
  'gamaMobileApp.customer',  
  'gamaMobileApp.login',
  'gamaMobileApp.book',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'angular.filter',
  'angularUtils.directives.dirPagination',
  'ngRoute',
  'ngResource'
])

.constant('domain','http://172.24.144.144/Library')

.config( function gamaMobileAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/books-list' );
})

 .run( function run ($rootScope, $state, $stateParams ) {
        loginStatus = readCookie('loginStatus');
        loginStatus = loginStatus.toString();

        continueGuest = readCookie('continueGuest');
        continueGuest = continueGuest.toString();
        role_id = readCookie('customerRole');
         
        if (loginStatus === 'true') {
          loginStatus = true;
          if( continueGuest === 'true' ) {
            $rootScope.loginUser = 'Guest';
            $rootScope.showLogin        = true;
            $rootScope.showLogout       = false;
          }
          else {
            $rootScope.loginUser = readCookie('loginUser');
            $rootScope.customerEmail = readCookie('customerEmail');
            $rootScope.customerMobile = readCookie('customerMobile');
            $rootScope.showLogin        = false;
            $rootScope.showLogout       = true;
            if( role_id == 2 ) {
							$rootScope.ismember = true;
						}
						else if( role_id == 1 ) {
							$rootScope.isAdmin = true;
						}
          }
        }
        else {
          loginStatus = false;
          $rootScope.loginUser = 'Guest';
          $rootScope.showLogin        = true;
          $rootScope.showLogout       = false;
        }
        $rootScope.cartItemsCount   = 0;   
        $rootScope.$state           = $state;
        $rootScope.$stateParams     = $stateParams;
        $rootScope.loginStatus      = loginStatus;
        $rootScope.customerId       =  readCookie('customerId');
        $rootScope.customeraddress       =  readCookie('customeraddress');
        $rootScope.menuclasses = 'lines-button x nav-menu menuhide';        
})


.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
     $rootScope.currentState = toState.name;
     
    $rootScope.menuClickEvent = function(action) {
        if (action === 'close') {
          $rootScope.menuclasses = 'lines-button x nav-menu menuhide';  
        }
        else {
          if ($rootScope.menuclasses.indexOf('menuhide') > -1) { 						
              $rootScope.menuclasses = 'lines-button x nav-menu menuclose';
          } else { 
              $rootScope.menuclasses = 'lines-button x nav-menu menuhide';
          }
        }
    };
        
    if ( angular.isDefined( toState.data.pageTitle ) ) {
        if($rootScope.parentCategory && toState.data.pageTitle==='SubMenu') {
            $scope.pageTitle = $rootScope.parentCategory;
        }
        else {
            $scope.pageTitle = toState.data.pageTitle;
        }
        $scope.pageTitle =  'Library ' + $scope.pageTitle  ;
    }
    if ( angular.isDefined( toState.data.pageCaption ) ) {
        if(sessionStorage.getItem('parentCategoryName') && toState.data.pageCaption==='SubMenu') {
            $scope.pageCaption = sessionStorage.getItem('parentCategoryName');
        }
        else {
            $scope.pageCaption = toState.data.pageCaption;
        }
    } 
    if ( angular.isDefined( toState.data.showBreadCrumb ) ) {
     $rootScope.showBreadCrumb =  toState.data.showBreadCrumb;
    }
    
    if ( angular.isDefined( toState.data.breadCrumbLink ) ) {
      $scope.breadCrumbLink =  toState.data.breadCrumbLink ;
    }
    
    if ( angular.isDefined( toState.data.showCart ) ) {
      $rootScope.showCart =  toState.data.showCart ;
    }
       
  });
}).directive("outsideClick", ['$document','$parse', function( $document, $parse ){
    return {
        link: function( $scope, $element, $attributes ){
            var scopeExpression = $attributes.outsideClick,
                onDocumentClick = function(event){
                    if( event.target.id != 'menu_parent_elem') {
                      var isChild = $element.find(event.target).length > 0;

                      if(!isChild) {
                          $scope.$apply(scopeExpression);
                      }
                    }
                };

            $document.on("click", onDocumentClick);

            $element.on('$destroy', function() {
                $document.off("click", onDocumentClick);
            });
        }
    };
}])
.directive('ngConfirmClick', [
        function(){
            return {
                priority: 1,
                terminal: true,
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.ngClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction);
                        }
                    });
                }
            };
    }]);

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
         c = c.substring(1,c.length);
       }
        if (c.indexOf(nameEQ) === 0) { 
          return c.substring(nameEQ.length,c.length);
        }
    }
    return false;
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}

app.controller('OtherController', OtherController);

function getOrdinalSuffix( number ) {
    var suffixes = ["'th'", "'st'", "'nd'", "'rd'"];
    var relevantDigits = (number < 30) ? number % 20 : number % 30;
    return (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
}
