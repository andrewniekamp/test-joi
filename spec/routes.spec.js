var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
var request = require('supertest');
var app = require('../app.js');

describe('Routes', () => {

  describe('Default route', function () {
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect('Content-Length', '12')
      .expect(200, 'Hello World!')
      .end(function (err, res) {
        if (err) throw err;
      });
  })

  describe('Name route', function () {
    request(app)
      .get('/penelope')
      .expect('Content-Type', /json/)
      .expect(200, { name: 'Penelope' })
      .end(function (err, res) {
        if (err) throw err;
      });
  })

})
