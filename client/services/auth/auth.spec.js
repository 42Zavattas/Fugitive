'use strict';

describe('Service: auth', function () {

  beforeEach(module('fugitive'));

  var auth;
  beforeEach(inject(function (_auth_) {
    auth = _auth_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
