var request = require('supertest');
var app = require('../app.js');

let isValidationError = (res) => {
  if (res.body.name !== 'ValidationError') throw new Error('Expected a validation error!');
}

describe('Routes', () => {

  describe('Default route', () => {
    it('should say hello', () => {
      request(app)
        .get('/')
        .expect('Content-Type', /text/)
        .expect('Content-Length', '12')
        .expect(200, 'Hello World!')
        .end(function (err, res) {
          if (err) throw err;
        });
      })
  })

  describe('Name route', () => {
    it('should respond with a name', () => {
      request(app)
        .get('/penelope')
        .expect('Content-Type', /json/)
        .expect(200, { name: 'Penelope' })
        .end(function (err, res) {
          if (err) throw err;
        });
    })
  })

  describe('Validate route', () => {
    it('should respond with a success if the body is valid', () => {
      request(app)
        .post('/validate')
        .send({ name: 'Ollie', age: 2 })
        .expect('Content-Type', /json/)
        .expect(200, { secretCode: 12345 })
        .end(function (err, res) {
          if (err) throw err;
        });
    })

    it('should respond with an error if the body is invalid', () => {
      request(app)
        .post('/validate')
        .send({ name: 12345, age: { fake: 'data' }})
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(isValidationError)
        .end(function (err, res) {
          if (err) throw err;
        });
    })

    it('should respond with a success if the query is valid', () => {
      request(app)
        .get('/users')
        .query({ id: 123 })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) throw err;
        });
    })

    it('should respond with an error if the query is invalid', () => {
      request(app)
        .get('/users')
        .query({ id: 'Wrong!' })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect(isValidationError)
        .end(function (err, res) {
          if (err) throw err;
        });
    })
  })

})
