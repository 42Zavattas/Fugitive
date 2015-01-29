'use strict';

require('should');

var server = require('../../server');
var request = require('supertest');

describe('GET /api/users', function () {

  it('should create a user', function (done) {
    request(server)
      .post('/api/users')
      .send({ email: 'test@test.com' })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) { return done(err); }
        console.log(res);
        done();
      });
  });

  it('should only send an email to an exiting user', function (done) {
    request(server)
      .post('/api/users')
      .send({ email: 'test@test.com' })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) { return done(err); }
        console.log(res);
        done();
      });
  });

  it('should delete me', function (done) {
    /*
    request(server)
      .delete('/api/users')
      .send();
    */
  });



});
