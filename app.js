const express = require('express')
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const app = express()

const routeConfig = require('./routeConfig');

app.use(bodyParser.json());

app.use((req, res, next) => {
  let validation = routeConfig.validateRequest(req);
  if (validation && validation.name === 'ValidationError') res.status(400).send(validation);
  else next();
})

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/penelope', (req, res) => {
  res.send({ name: 'Penelope' });
})

app.get('/users', (req, res) => {
  res.send({ user: {
    name: 'Penelope',
    age: 5
  } });
})

app.post('/validate', (req, res) => {
  // Only sent when req is validated above
  res.send({ secretCode: 12345 });
});

app.use( (error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = app;
