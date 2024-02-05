import sgMail from '../../../config/email';
import config from '../../../config';
import { commonTemplate } from '../../../lib/templates/admin/email/commonTemplate';

const MailService = async(subject, messageType, data) => {
  const msg = {
    to: data.email,
    cc: '',
    from: {
      name: 'Admin',
      email: config.CLOCKING_SYSTEM_SENDGRID_FROM
    },
    subject,
    html: commonTemplate(messageType, data)
  };
  console.log('I got here')
  try {
    if (config.CLOCKING_SYSTEM_MESSAGE_FORWARDING === 'true') {
      await sgMail.send(msg);
      logger.info(`Message sent to ${data.email}`);
    }
    return;
  } catch (error) {
    console.log(error.response.body)
    logger.error(`Error sending mail :: ${error}`);
  }
};

export default MailService;