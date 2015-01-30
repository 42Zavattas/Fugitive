'use strict';

angular.module('fugitive')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/lognup', {
        templateUrl: 'views/lognup/lognup.html',
        controller: 'LognupCtrl',
        controllerAs: 'vm'
      });
  });
