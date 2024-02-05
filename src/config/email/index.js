import 'dotenv/config';
import sgMail from '@sendgrid/mail';
import config from '../index';


sgMail.setApiKey(config.CLOCKING_SYSTEM_SENDGRID_API_KEY);

export default sgMail;
