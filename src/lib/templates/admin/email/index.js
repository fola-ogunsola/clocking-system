import * as authEmail from './authTemplates.js';

const getTemplate = (type, data) => {
  switch (type) {
//   case 'adminInviteMail': return authEmail.adminInviteMail(data);
  case 'adminForgotPassword': return authEmail.adminForgotPassword(data);
  case 'adminResetPassword': return authEmail.adminResetPassword(data);
  default: return '';
  }
};

export default getTemplate;