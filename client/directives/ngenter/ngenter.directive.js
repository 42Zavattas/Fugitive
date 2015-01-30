'use strict';

angular.module('fugitive')
  .directive('ngEnter', function () {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if (event.which === 13) {
            scope.$apply(function () {
              scope.$eval(attrs.ngEnter, { 'event': event });
            });
            event.preventDefault();
          }
        });
      }
    };
  });
