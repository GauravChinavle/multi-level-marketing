const Joi = require('joi');

const schemas = {
   memberSchema : Joi.object().keys({ 
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        mobile: Joi.string().length(10).required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pincode: Joi.string().required(),
        parentId: Joi.number().required(),
        level: Joi.number().required(),
        active: Joi.number().optional(),
      })
}; 
module.exports = schemas;