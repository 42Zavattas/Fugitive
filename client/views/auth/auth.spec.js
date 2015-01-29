'use strict';

describe('Controller: AuthCtrl', function () {

  beforeEach(module('fugitive'));

  var MainCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('AuthCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
