'use strict';

describe('Directive: zavaCubes', function () {

  beforeEach(module('oggApp'));
  beforeEach(module('app/directives/zavacubes/zavacubes.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should ...', inject(function ($compile) {
    element = angular.element('<zava-cubes></zava-cubes>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(1).toBe(1);
  }));
});
