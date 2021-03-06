/*!
 *
 * Angle - Bootstrap Admin App + AngularJS
 *
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 *
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// -----------------------------------



var App = angular.module('angle', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize', 'ngResource'])
          .run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
              // Set reference to access them from any scope
              localStorage.setItem('UserName','SA3ADGM');
              localStorage.setItem('Password','SA3ADGMGOS2011');

              $rootScope.$state = $state;
              $rootScope.$stateParams = $stateParams;
              $rootScope.$storage = $window.localStorage;
              $rootScope.basURL ="http://localhost/gos-mob/#/gos";
              // Uncomment this to disables template cache
              /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                  if (typeof(toState) !== 'undefined'){
                    $templateCache.remove(toState.templateUrl);
                  }
              });*/

              // Scope Globals
              // -----------------------------------
              $rootScope.app = {
                name: 'Gos',
                description: 'Lightweight version of GOS',
                year: ((new Date()).getFullYear()),
                layout: {
                  isFixed: true,
                  isCollapsed: false,
                  isBoxed: false,
                  isRTL: false
                },
                viewAnimation: 'ng-fadeInUp'
              };
              $rootScope.user = {
                name:     'Riza Masta',
                job:      'ng-Dev',
                picture:  'app/img/user/02.jpg'
              };
            }
          ]);
