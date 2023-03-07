import * as Joi from 'joi';

const error = 'All fields must be filled';

const LoginBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': error,
    'string.email': 'Invalid email or password',
    'string.required': error,
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': error,
    'string.min': 'Invalid email or password',
    'string.required': error,
  }),
});

export default LoginBodySchema;
