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
const validateRequest = (req) => {
  if (routesToSecure[req.path] && routesToSecure[req.path].requiresValidation) {
    if (routesToSecure[req.path].config.query) {
      return Joi.validate(req.query, routesToSecure[req.path].config.query, (err, value) => {
        if (err) return err;
      })
    }
    if (routesToSecure[req.path].config.body) {
      return Joi.validate(req.body, routesToSecure[req.path].config.body, (err, value) => {
        if (err) return err;
      })
    }
  }
  return null;
}

module.exports = validateRequest;
