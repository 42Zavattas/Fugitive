'use strict';

angular.module('fugitive')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/404', {
        templateUrl: 'views/404/404.html',
        controller: '404Ctrl',
        controllerAs: 'vm'
      });
  });
