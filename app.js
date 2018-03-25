const express = require('express')
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const app = express()

const routesToSecure = require('./routeConfig');

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (routesToSecure[req.path] && routesToSecure[req.path].requiresValidation) {
    Joi.validate(req.body, routesToSecure[req.path].config.body, (err, value) => {
      if (err) res.status(400).send(err);
      else next();
    })
  } else {
    next()
  }
})

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/penelope', (req, res) => {
  res.send({ name: 'Penelope' });
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
