'use strict';

angular.module('fugitive', [
  'ngRoute',
  'ngCookies',
  'ngAnimate'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('httpInterceptor');
  })

  .factory('httpInterceptor', function ($q, $location, $cookieStore, auth) {
    return {
      request: function (config) {
        var opti = $cookieStore.get('token');
        if (opti) {
          config.headers.Authorization = 'Bearer ' + opti;
        }
        return config;
      },
      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/');
          auth.removeToken();
        }
        return $q.reject(response);
      }
    }
  })

  .run(function ($rootScope, auth) {
    $rootScope.auth = auth;
  });
