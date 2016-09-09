"use strict";

var mongoose = require('mongoose');
var chai = require('chai');
var app = require('../server/server');
var request = require('supertest')(app);

var expect = chai.expect;

describe ('Cookie methods functionality test', function() {
  // var tokenCookie;
  // var dbCookie;
  // var location;
  //
  // before(function(done) {
  //   var user = { userName: 'oo', password: 'oo' }
  //
  //   request
  //     .post('/login')
  //     .send(user)
  //     .end(function(err, res) {
  //       dbCookie = res.header['set-cookie'].pop().split(';')[0].split('=')[0];
  //       tokenCookie = res.header['set-cookie'].pop().split(';')[0].slice(0, 5);
  //       location = res.header.location;
  //       done();
  //     });
  // });

  it('should set token cookie', function(done) {
    var user = { userName: 'oo', password: 'oo' }
    request
      .post('/login')
      .send(user)
      .end(function(err, res) {
        expect(res.header['set-cookie'].pop().split(';')[0].split('=')[0]).to.equal('database');
        done();
      });
  });

  it('should set database cookie', function(done) {
    var user = { userName: 'oo', password: 'oo' }
    request
      .post('/login')
      .send(user)
      .end(function(err, res) {
        expect(res.header['set-cookie'].shift().split(';')[0].split('=')[0]).to.equal('token');
        done();
      });
  });

  it('redirect to dashboard for specific dev', function(done) {
    var user = { userName: 'oo', password: 'oo' }
    request
      .post('/login')
      .send(user)
      .end(function(err, res) {
        expect(res.header.location).to.equal('/dashboard/oo');
        done();
      });
  });
});
