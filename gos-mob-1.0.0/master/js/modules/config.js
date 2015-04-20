/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/
var base_url ="http://localhost/gos-lite/#/gos/";

App.config(['$stateProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'APP_REQUIRES',
function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, appRequires) {
  'use strict';

  App.controller = $controllerProvider.register;
  App.directive  = $compileProvider.directive;
  App.filter     = $filterProvider.register;
  App.factory    = $provide.factory;
  App.service    = $provide.service;
  App.constant   = $provide.constant;
  App.value      = $provide.value;

  // LAZY MODULES
  // -----------------------------------

  $ocLazyLoadProvider.config({
    debug: false,
    events: true,
    modules: appRequires.modules
  });


  // defaults to dashboard

  $urlRouterProvider.otherwise('/gos/dashboard');

  //
  // Application Routes
  // -----------------------------------
  $stateProvider
    .state('gos', {
        url: '/gos',
        abstract: true,
        templateUrl: basepath('app.html'),
        controller: 'AppController',
        resolve: resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
    })
    .state('gos.dashboard', {
        url: '/dashboard',
        title: 'Dashboard',
        templateUrl: basepath('dashboard.html'),
        resolve: resolveFor('flot-chart','flot-chart-plugins')
    })
    .state('gos.gosMemberProfile', {
        url: '/gosMemberProfile',
        title: 'Member Gos Profile',
        templateUrl: basepath('profile.html'),
        controller: 'ProfileGOSController',
        resolve: resolveFor('flot-chart','flot-chart-plugins')
    })
    .state('gos.bookFlight', {
        url: '/bookFlight',
        title: 'Book A Flight',
        templateUrl: basepath('bookFlightWizard.html'),
        resolve: resolveFor('parsley'),
        controller: 'NullController'

    })
    .state('gos.bfw', {
        url: '/bookFlightData',
        title: 'Data Book Flight',
        templateUrl: basepath('testBook.html'),
        controller: 'NullController'

    })
    .state('gos.transactionReview', {
        url: '/transactionReview/',
        title: 'Review Transaction',
        templateUrl: basepath('transactionReview.html'),
        controller: 'NullController'

    })
    .state('gos.manajemenBooker', {
        url: '/BookerManajemen/',
        title: 'Manajemen Booker',
        templateUrl: basepath('manajemenBooker.html'),
        controller: 'NullController'

    })
    .state('gos.myProfile', {
        url: '/myProfile',
        title: 'My Profile',
        templateUrl: basepath('myProfile.html'),
        controller: 'NullController'

    })
    .state('gos.bookFlightAvailable', {
        url: '/bookFlightAvailable',
        title: 'Book Flight Available',
        templateUrl: basepath('bookFlightAvailable.html'),
        controller: 'NullController'

    })
    .state('gos.bookFlightAvailableFare', {
        url: '/bookFlightAvailableFare',
        title: 'Fare For Flight Booking',
        templateUrl: basepath('bookFlightAvailableFare.html'),
        controller: 'NullController'

    })
    .state('gos.bookingFlight', {
        url: '/bookingFlight',
        title: 'Booking',
        templateUrl: basepath('bookingFlight.html'),
        controller: 'NullController'

    })

    ;


    // Set here the base of the relative path
    // for all app views
    function basepath(uri) {
      return 'app/views/' + uri;
    }

    // Generates a resolve object by passing script names
    // previously configured in constant.APP_REQUIRES
    function resolveFor() {
      var _args = arguments;
      return {
        deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
          // Creates a promise chain for each argument
          var promise = $q.when(1); // empty promise
          for(var i=0, len=_args.length; i < len; i ++){
            promise = andThen(_args[i]);
          }
          return promise;

          // creates promise to chain dynamically
          function andThen(_arg) {
            // also support a function that returns a promise
            if(typeof _arg == 'function')
                return promise.then(_arg);
            else
                return promise.then(function() {
                  // if is a module, pass the name. If not, pass the array
                  var whatToLoad = getRequired(_arg);
                  // simple error check
                  if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                  // finally, return a promise
                  return $ocLL.load( whatToLoad );
                });
          }
          // check and returns required data
          // analyze module items with the form [name: '', files: []]
          // and also simple array of script files (for not angular js)
          function getRequired(name) {
            if (appRequires.modules)
                for(var m in appRequires.modules)
                    if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                        return appRequires.modules[m];
            return appRequires.scripts && appRequires.scripts[name];
          }

        }]};
    }

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
  }])
.controller('NullController', function() {});
