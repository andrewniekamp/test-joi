const { celebrate, Joi, errors } = require('celebrate');

const routesToSecure = {
  '/validate': {
    requiresValidation: true,
    config: {
      body: Joi.object().keys({
        name: Joi.string().required(),
        age: Joi.number().integer().required()
      })
    }
  }
}

module.exports = routesToSecure;
