const Joi = require('joi').extend(require('@joi/date'));

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
  

  const fetchMembers = Joi.object().keys({
    search: Joi.string().optional(),
    page: Joi.number().positive().optional(),
    per_page: Joi.number().positive().optional(),
    date: Joi.date().optional(),
    to_date: Joi.date().optional()
  });

  const fetchOneMember = Joi.object().keys({
    search: Joi.string().required()

  });


  const setNewPassword = Joi.object().keys({
    // email: Joi.string().email().required(),
    new_password: Joi.string().regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')).messages({
      'string.pattern.base': 'Invalid password combination'
    }).required().min(8),
    confirm_password: Joi.string().required(),
    old_password: Joi.string().required()
  });

  export default {
    addMember,
    editMember,
    fetchMembers,
    fetchOneMember,
    setNewPassword
  }