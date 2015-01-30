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
      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/');
          auth.removeToken();
        }
        return $q.reject(response);
      }
    }
  })

  .run(function ($http, $cookieStore, $rootScope, auth) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookieStore.get('token');

    $rootScope.isLogged = auth.isLogged;
  });
