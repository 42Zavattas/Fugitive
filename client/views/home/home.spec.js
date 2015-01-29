'use strict';

describe('Controller: HomeCtrl', function () {

  beforeEach(module('fugitive'));

  var HomeCtrl,
    scope;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('should be obvious', function () {
    expect(4).toBe(4);
  });

});
