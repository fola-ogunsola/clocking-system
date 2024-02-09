const Joi = require('joi').extend(require('@joi/date'));

const adminLogin = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

const adminForgotPassword = Joi.object().keys({
    email: Joi.string().email().required()
  });

const verifyOtp = Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.string().required().length(6),
    // new_password: Joi.string().required()
  });

  const setPassword = Joi.object().keys({
    password: Joi.string().regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).messages({
      'string.pattern.base': 'Invalid password combination'
    }).required().min(8)
  });

export default {
    adminLogin,
    adminForgotPassword,
    verifyOtp,
    setPassword
  }