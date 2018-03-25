const Joi = require('joi');

const routesToSecure = {
  '/validate': {
    requiresValidation: true,
    config: {
      body: Joi.object().keys({
        name: Joi.string().required(),
        age: Joi.number().integer().required()
      })
    }
  },
  '/users': {
    requiresValidation: true,
    config: {
      query: Joi.object().keys({
        id: Joi.number().required(),
      })
    }
  }
}
const validateRequest = (req, res, next) => {
  /** next() if path isn't in list, or validation isn't required */
  if (!routesToSecure[req.path] || !routesToSecure[req.path].requiresValidation) {
    next();
  }
  /** Else, validate the query object, if it exists */
  else if (routesToSecure[req.path].config.query) {
    Joi.validate(req.query, routesToSecure[req.path].config.query, (err, value) => {
      if (err) res.status(400).send(err);
      else next();
    })
  }
  /** Else, validate the body object, if it exists */
  else if (routesToSecure[req.path].config.body) {
    Joi.validate(req.body, routesToSecure[req.path].config.body, (err, value) => {
      if (err) res.status(400).send(err);
      else next();
    })
  }
  /** Else, the path should have had validation, but something was uncaught. */
  else {
    res.status(400).send(new Error('Request was unable to be validated.'));
  }
}

module.exports = validateRequest;
