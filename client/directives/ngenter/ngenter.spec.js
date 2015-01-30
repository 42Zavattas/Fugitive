'use strict';

describe('Directive: ngEnter', function () {

  beforeEach(module('fugitive', 'templates'));

  var element, scope;

  beforeEach(inject(function($compile, $rootScope){
    scope = $rootScope.$new();
    element = angular.element('<ng-enter></ng-enter>');
    element = $compile(element)(scope);
    scope.$apply();
  }));

  it('should ...', inject(function ($compile) {
    expect(1).toBe(1);
  }));
});
