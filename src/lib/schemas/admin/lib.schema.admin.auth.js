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

const addMember = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number:Joi.string().regex(new RegExp('^(\\+[0-9]{2,}[0-9]{4,}[0-9]*)(x?[0-9]{1,})?$'))
    .messages({
      'string.pattern.base': 'Phone number must contain +countryCode and extra required digits',
      'string.empty': 'Phone Number is not allowed to be empty'
    }).required(),
    // profile_image: Joi.string().required()
  });


  const editMember = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number:Joi.string().regex(new RegExp('^(\\+[0-9]{2,}[0-9]{4,}[0-9]*)(x?[0-9]{1,})?$'))
    .messages({
      'string.pattern.base': 'Phone number must contain +countryCode and extra required digits',
      'string.empty': 'Phone Number is not allowed to be empty'
    }).required(),
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
    addMember,
    editMember,
    setPassword

}