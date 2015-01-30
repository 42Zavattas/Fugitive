'use strict';

require('should');

var server = require('../../server');
var request = require('supertest');

describe('GET /api/users', function () {

  it('should fail', function (done) {
    request(server)
      .post('/lognup')
      .send({ nothingInteresting: '' })
      .expect(400)
      .end(function (err) {
        if (err) { return done(err); }
        done();
      });
  });

  it('should create a user', function (done) {
    request(server)
      .post('/lognup')
      .send({ email: 'test@test.com' })
      .expect(200)
      .end(function (err) {
        if (err) { return done(err); }
        done();
      });
  });

  it('should update auth link of existing user', function (done) {
    request(server)
      .post('/lognup')
      .send({ email: 'test@test.com' })
      .expect(200)
      .end(function (err) {
        if (err) { return done(err); }
        done();
      });
  });

  it('should delete me', function (done) {

    done();

  });



});
