'use strict';

angular.module('fugitive')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/auth', {
        templateUrl: 'views/auth/auth.html',
        controller: 'AuthCtrl',
        controllerAs: 'vm'
      });
  });
