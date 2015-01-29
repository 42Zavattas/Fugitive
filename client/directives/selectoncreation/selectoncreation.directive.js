'use strict';

angular.module('fugitive')
  .directive('selectOnCreation', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        scope.$on('linkCreated', function () {
          $timeout(function () {
            element[0].select();
          });
        });
      }
    };
  });
