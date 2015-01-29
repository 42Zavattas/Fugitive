'use strict';

angular.module('fugitive')
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      });
  });
