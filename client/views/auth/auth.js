'use strict';

angular.module('fugitive')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/auth/:token', {
        templateUrl: 'views/auth/auth.html',
        controller: 'AuthCtrl',
        controllerAs: 'vm'
      });
  });
