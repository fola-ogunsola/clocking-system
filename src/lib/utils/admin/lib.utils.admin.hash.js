import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../../config';


export const generateAdminAuthToken = (admin) => {
    try {
      const { email} = admin;
      const token = jwt.sign({ email}, config.CLOCKING_SYSTEM_ENCODING_AUTHENTICATION_SECRET, { expiresIn: '24h' });
      return token;
    } catch (error) {
      return error;
    }
  };

  export const hashData = (data) => {
    const salt = bcrypt.genSaltSync(parseFloat(config.CLOCKING_SYSTEM_BCRYPT_SALT_ROUND));
    const hash = bcrypt.hashSync(data, salt);
    if (hash) {
      return hash;
    }
    return false;
  };

  export const decodeToken = (token) => {
    try {
      return jwt.verify(token, config.CLOCKING_SYSTEM_ENCODING_AUTHENTICATION_SECRET);
    } catch (error) {
      return error;
    }
  };


  export const generateAdminResetPasswordToken = (admin) => {
    try {
      console.log(admin)
      const { email } = admin;
     return jwt.sign({ email }, config.CLOCKING_SYSTEM_ENCODING_AUTHENTICATION_SECRET, { expiresIn: '5m' });
    } catch (error) {
      return error;
    }
  };