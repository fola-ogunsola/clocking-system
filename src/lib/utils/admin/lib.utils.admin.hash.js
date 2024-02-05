import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../../config';


export const generateAdminAuthToken = (admin) => {
    try {
      const { email} = admin;
      console.log(config.CLOCKING_SYSTEM_ENCODING_AUTHENTICATION_SECRET)
      const token = jwt.sign({ email}, config.CLOCKING_SYSTEM_ENCODING_AUTHENTICATION_SECRET, { expiresIn: '24h' });
      console.log(token)
      return token;
    } catch (error) {
      console.log(error)
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