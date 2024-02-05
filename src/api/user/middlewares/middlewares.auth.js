import { processAnyData , processOneOrNoneData } from '../services/services.db';
import authQueries from '../queries/queries.auth';
import * as Hash from '../../../util/index';
import * as hashed from '../../../lib/utils/admin/lib.utils.admin.hash'
import enums from '../../../lib/enums';
import Response from '../../../lib/http/lib.http.responses';


//processAnyData - Return Array
//processOneOrNoneData - Returns object
/**
 * check if password sent matches admins password in the DB
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns an object (error or response).
 * @memberof AdminAuthMiddleware
 */

export const compareAdminPassword = async(req, res, next) => {
    try {
      const {
        body: { password }, admin
      } = req;
      const [ adminPasswordDetails ] = await processAnyData(authQueries.fetchAdminPassword, [admin.email]);
      const passwordValid = await Hash.compareData(password.trim(), adminPasswordDetails.password);
      logger.info(`${enums.CURRENT_TIME_STAMP}, ${admin.email}:::Info: successfully returned compared passwords response compareAdminPassword.admin.middlewares.auth.js`);
      if (passwordValid) {
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${admin.email}:::Info: login password matches compareAdminPassword.admin.middlewares.auth.js`);
        return next();
      }
      logger.info(`${enums.CURRENT_TIME_STAMP}, ${admin.email}:::Info: login password does not match compareAdminPassword.admin.middlewares.auth.js`);
      return Response.error(res, enums.INVALID_LOGIN_CREDENTIALS, enums.HTTP_BAD_REQUEST, enums.COMPARE_ADMIN_PASSWORD_MIDDLEWARE);
    } catch (error) {
      error.label = enums.COMPARE_ADMIN_PASSWORD_MIDDLEWARE;
      logger.error(`comparing incoming and already set password in the DB failed:::${enums.COMPARE_ADMIN_PASSWORD_MIDDLEWARE}`, error.message);
      return next(error);
    }
  };


export const verifyAdminVerificationToken = async(req, res, next) => {
  try {
    const { body: { otp, email } } = req;
    const otpAdmin = await processOneOrNoneData(authQueries.verifyPasswordToken, [ email, otp])
    console.log(otpAdmin)
    logger.info(`${enums.CURRENT_TIME_STAMP}, Info: checked if correct OTP sent is correct verifyAdminVerificationToken.admin.middlewares.auth.js`);
    if(!otpAdmin){
      logger.info(`${enums.CURRENT_TIME_STAMP}, Info: OTP is invalid verifyAdminVerificationToken.admin.middlewares.auth.js`);
      return Response.error(res, enums.INVALID_LOGIN_CREDENTIALS, enums.HTTP_BAD_REQUEST, enums.VERIFY_ADMIN_VERIFICATION_TOKEN_MIDDLEWARE);
    }
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${otpAdmin.email}:::Info: OTP is valid verifyAdminVerificationToken.admin.middlewares.auth.js`);
    return next();
  } catch (error) {
    error.label = enums.VERIFY_ADMIN_VERIFICATION_TOKEN_MIDDLEWARE;
    logger.error(`verifying verification token failed::${enums.VERIFY_ADMIN_VERIFICATION_TOKEN_MIDDLEWARE}`, error.message);
    return next(error);
  }
}

export const checkIfMemberEmailAlreadyExist = async(req, res, next) => {
  try {
    const { body } = req;
    const [ memberEmail ] = await processAnyData(authQueries.getMemberByEmail, [ body.email.trim().toLowerCase() ]);
    if (!memberEmail) {
      console.log(memberEmail)
      logger.info(`${enums.CURRENT_TIME_STAMP},:::Info: 
      successfully confirms that member's email is not existing in the database checkIfAdminEmailAlreadyExist.admin.middlewares.admin.js`);
      return next();
    }
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: 
    successfully confirms that member's email is existing in the database checkIfAminEmailAlreadyExist.admin.middlewares.admin.js`);
    return Response.error(res, enums.MEMBER_EMAIL_EXIST, enums.HTTP_CONFLICT, enums.CHECK_IF_MEMBER_EMAIL_ALREADY_EXIST_MIDDLEWARE);
  } catch (error) {
    error.label = enums.CHECK_IF_MEMBER_EMAIL_ALREADY_EXIST_MIDDLEWARE;
    logger.error(`checking if member email is not already existing failed::${enums.CHECK_IF_MEMBER_EMAIL_ALREADY_EXIST_MIDDLEWARE}`, error.message);
    // return next(error);
    console.log(error)
  }
};

export const validateAdminAuthenticationToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if(!token){
      logger.info(`${enums.CURRENT_TIME_STAMP}, Info: successfully decoded that no authentication token was sent with the headers
      validateAdminAuthToken.admin.middlewares.auth.js`);
      return Response.error(res, enums.NO_TOKEN, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_ADMIN_AUTH_TOKEN_MIDDLEWARE);
    }
    if (!token.startsWith('Bearer ')) {
      return Response.error(res, enums.INVALID_TOKEN, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_ADMIN_AUTH_TOKEN_MIDDLEWARE);
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
      logger.info(`${enums.CURRENT_TIME_STAMP}, Info: successfully extracts token validateAdminAuthToken.admin.middlewares.auth.js`);
    }
    const decoded = hashed.decodeToken(token)
    logger.info(`${enums.CURRENT_TIME_STAMP},:::Info: successfully decoded authentication token sent using the authentication secret
    validateAdminAuthToken.admin.middlewares.auth.js`);
    console.log(req.files, 'here-here')
    if (decoded.message) {
      if (decoded.message === 'jwt expired') {
        return Response.error(res, enums.SESSION_EXPIRED, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_ADMIN_AUTH_TOKEN_MIDDLEWARE);
      }
      logger.info(`${enums.CURRENT_TIME_STAMP}, ${decoded.admin_id}:::Info: successfully decoded authentication token has a message which is an 
      error message validateAdminAuthToken.admin.middlewares.auth.js`);
      return Response.error(res, decoded.message, enums.HTTP_UNAUTHORIZED, enums.VALIDATE_ADMIN_AUTH_TOKEN_MIDDLEWARE);
    }
    return next();
  } catch(error) {
    error.label = enums.VALIDATE_ADMIN_AUTH_TOKEN_MIDDLEWARE;
    logger.error(`Validating the admin auth token sent failed:::${enums.VALIDATE_ADMIN_AUTH_TOKEN_MIDDLEWARE}`, error.message);
    return next(error);
  }
}