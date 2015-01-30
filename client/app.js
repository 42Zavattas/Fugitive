'use strict';

angular.module('fugitive', [
  'ngRoute',
  'ngCookies',
  'ngAnimate'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })

  .run(function ($http, $cookieStore) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookieStore.get('token')
  });
