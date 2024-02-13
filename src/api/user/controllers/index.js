// controllers
import dayjs from 'dayjs';
const bcrypt = require('bcryptjs');
import authQueries from '../queries/queries.auth'
import { processAnyData} from '../services/services.db';
import Response from '../../../lib/http/lib.http.responses';
import enums from '../../../lib/enums';
import config from '../../../config';
import * as Hash from '../../../lib/utils/admin/lib.utils.admin.hash';
import * as Helpers from '../../../lib/utils/admin/lib.utils.admin.helper'
import { error } from 'winston';
import MailService from '../services/services.email';
import MemberPayload from '../../../lib/payloads/admin/lib.payload.admin.admin'


/**
 * login admin
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns {object} - Returns admin login details.
 * @memberof AdminAuthController
 */

export const adminLogin = async(req, res, next) => {
    const { admin} = req;
    try {
        const token = await Hash.generateAdminAuthToken(admin);
        logger.info(`${enums.CURRENT_TIME_STAMP},${admin.email}:::Info: auth token generated login.admin.controllers.auth.js`)
        const [loginAdmin] = await processAnyData(authQueries.loginAdmin, [admin.email])
        return Response.success(res, enums.ADMIN_LOGIN_SUCCESSFULLY, enums.HTTP_OK, {...loginAdmin,token:token})//... used to spread data inside parent object (spread operator)
    }catch {
        error.label = enums.ADMIN_LOGIN_CONTROLLER;
        logger.error(`login admin failed:::${enums.ADMIN_LOGIN_CONTROLLER}`, error.message);
        return next(error);
    }
};

/**
 * generate OTP code
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { String } - The OTP code
 * @memberof AdminAuthController
 */


export const otpGenerationAdmin = async(req, res, next) => {
    try {
        const otp =  Helpers.generateOtp();
        logger.info(`${enums.CURRENT_TIME_STAMP}, Info: random OTP generated otpGenerationAdmin.admin.controllers.auth.js`);
        console.log(otp, '--------')
        return otp; 
    } catch (error) {
        error.label = enums.OTP_GENERATION_ADMIN_CONTROLLER;
        logger.error(`Generate verification OTP failed::${enums.OTP_GENERATION_ADMIN_CONTROLLER}`, error.message);
        return next(error);
      }
};



/** 
*  Admin Forgot password
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response containing user details
 * @memberof AdminAuthController
 */

export const forgotPassword = async(req, res, next) => {
        const {admin} = req;
        // const adminName = `${admin.full_name}, ${admin.email}`;
        console.log(admin.email)
    try {
        const resetPasswordToken = await otpGenerationAdmin(req, res, next);
        // const tokenExpirationLength = 5;
        // const expireAt = dayjs().add(tokenExpirationLength, 'minutes');
        // const expirationTime = dayjs(expireAt);
        const payload = [resetPasswordToken, admin.email ]
        console.log(resetPasswordToken)
        await processAnyData(authQueries.forgotAdminPassword, payload)
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${admin.id}:::Info: reset password token set in the DB forgotPassword.admin.controllers.auth.js`);
        const data = {
            email : admin.email,
            fullname : admin.full_name,
            resetPasswordToken
        };
        console.log(admin)
        await MailService('Reset your password', 'adminForgotPassword', { ...data });
        delete data.resetPasswordToken;
        return Response.success(res, enums.FORGOT_PASSWORD_TOKEN, enums.HTTP_OK, data);
    } catch (error) {
        logger.error(`admin forgot password request failed:::${enums.ADMIN_FORGOT_PASSWORD_CONTROLLER}`, error.message);
        return next(error);
    }
};



export const generateAdminPasswordResetToken = async(req, res, next) => {
    const {admin} = req;
    const adminName = `${admin.id}`;
    try {
        const passwordToken = await Hash.generateAdminResetPasswordToken(admin);
        logger.info(`${enums.CURRENT_TIME_STAMP},::: Info: successfully generated password token generateAdminPasswordResetToken.admin.controllers.auth.js`);
        // const tokenExpiration = await JSON.parse(Buffer.from(passwordToken.split('.')[1], 'base64').toString()).exp;
        // const myDate = new Date(tokenExpiration * 1000);
        // const tokenExpireAt = dayjs(myDate);
        logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: successfully fetched token expiration time and converted it 
        generateAdminPasswordResetToken.admin.controllers.auth.js`);
        console.log(passwordToken)
        return Response.success(res, enums.GENERATE_ADMIN_RESET_PASSWORD_TOKEN, enums.HTTP_OK,  {passwordToken});
    } catch (error) {
        error.label = enums.GENERATE_ADMIN_PASSWORD_TOKEN_CONTROLLER;
        logger.error(`generate password reset token failed${enums.GENERATE_ADMIN_PASSWORD_TOKEN_CONTROLLER}`, error.message);
        return next(error);
    }
};


/** 
*  Admin Reset password
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @param {Next} next - Call the next operation.
 * @returns { JSON } - A JSON response containing user details
 * @memberof AdminAuthController
 */


export const resetPassword = async(req, res, next) => {
    // const {admin} = req;
    // const adminName = `${admin.full_name}, ${admin.email}, ${admin.resetPasswordToken}`;
    // const new_password = req.body.new_password
    try {
        const { body: { password} , admin} = req;
        // const [ admin ] = await processAnyData(authQueries.getAdminByEmail, [ email.trim().toLowerCase() ]);
        // if(!admin) {
        //     logger.info(`${enums.CURRENT_TIME_STAMP}, Info: successfully decoded that the user with the email does not exist in the DB 
        //     verifyAdminVerificationToken.admin.middlewares.auth.js`);
        //     return Response.error(res, enums.ACCOUNT_NOT_EXIST('Admin'), enums.HTTP_UNAUTHORIZED, enums.VERIFY_ADMIN_VERIFICATION_TOKEN_MIDDLEWARE);
        // }
        logger.info(`${enums.CURRENT_TIME_STAMP}, Info: Admin is fetched successfully resetPassword.admin.controllers.auth.js`);
        const hash = await Hash.hashData(password.trim());
        console.log(hash)
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${admin.email}:::Info: password hashed resetPassword.admin.controllers.auth.js`);
        const [ setNewPassword ] = await processAnyData(authQueries.setNewAdminPassword, [  hash,　admin.email ]);
        logger.info(`${enums.CURRENT_TIME_STAMP}, ${admin.email}:::Info: Reset password saved in the DB setPassword.admin.controllers.auth.js`);
        const data = {
            email: admin.email,
            full_name: admin.full_name
          };
          await MailService('Password reset successful', 'adminResetPassword', { ...data });
          return Response.success(res, enums.PASSWORD_SET_SUCCESSFULLY, enums.HTTP_OK, setNewPassword);
    }catch {
        error.label = enums.SET_PASSWORD_CONTROLLER;
        logger.error(`admin set new password failed:::${enums.SET_PASSWORD_CONTROLLER}`, error.message);
        return next(error);
    }
};



