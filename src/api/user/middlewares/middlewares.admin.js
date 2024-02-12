import Response from '../../../lib/http/lib.http.responses';
import enums from '../../../lib/enums';
import authQueries from '../queries/queries.auth'
import { processAnyData } from '../services/services.db';

/**
 * Fetch admin details from the database
 * @param {string} type - a type to know which of the response to return
 * @returns {object} - Returns an object (error or response).
 * @memberof AdminAdminMiddleware
 */

export const validateUnAuthenticatedAdmin = (type = '') => async(req, res, next) => {
    try {
        const { body } = req;
        const payload = body.email || req.admin.email;
        const [ admin ] = await processAnyData(authQueries.getAdminByEmail, [ payload.trim().toLowerCase() ]);
        logger.info(`${enums.CURRENT_TIME_STAMP}, Info: successfully fetched admin details from the database validateUnAuthenticatedAdmin.admin.middlewares.admin.js`);
        if (!admin && (type === 'login' || type === 'verify')) {
            logger.info(`${enums.CURRENT_TIME_STAMP}, Info: confirms that admin's email is not existing in the database validateUnAuthenticatedAdmin.admin.middlewares.admin.js`);
            return Response.error(res, type === 'login' ? enums.INVALID_LOGIN_CREDENTIALS : enums.ACCOUNT_NOT_EXIST('Admin'),
              enums.HTTP_BAD_REQUEST, enums.VALIDATE_UNAUTHENTICATED_ADMIN_MIDDLEWARE);
          }
          req.admin = admin;
          return next();
        } catch (error) {
            error.label = enums.VALIDATE_UNAUTHENTICATED_ADMIN_MIDDLEWARE;
            logger.error(`getting admins details from the database failed::${enums.VALIDATE_UNAUTHENTICATED_ADMIN_MIDDLEWARE}`, error.message);
            return next(error);
          }
}



