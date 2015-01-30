'use strict';

describe('Directive: selectOnCreation', function () {

  beforeEach(module('fugitive'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', inject(function ($compile) {
    element = angular.element('<select-on-creation></select-on-creation>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
