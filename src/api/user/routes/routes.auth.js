import { Router } from 'express';
import ApiResponse from '../../../lib/http/lib.http.responses';
import { hashPassword } from '../../../util';
import Model from '../middlewares/middlewares.model'
import Schema from '../../../lib/schemas/admin/lib.schema.admin.auth'
import * as AdminMiddleware from '../middlewares/middlewares.admin'
import * as AuthMiddleware from '../middlewares/middlewares.auth';
import * as AuthController from '../controllers/index'



const router = Router();

router.get(
  // eslint-disable-next-line no-unused-vars
  '/', (req, res) => {
    return ApiResponse.success(res, 'Auth Route is reachable', 200);
  }
);

router.post('/hashpassword', hashPassword)

router.post('/login',
Model(Schema.adminLogin, 'payload'),
AdminMiddleware.validateUnAuthenticatedAdmin('login'),
AuthMiddleware.compareAdminPassword,
AuthController.adminLogin
);

router.post('/forgot-password',
Model(Schema.adminForgotPassword, 'payload'),
AdminMiddleware.validateUnAuthenticatedAdmin('verify'),
AuthController.forgotPassword
);


router.post('/verify-reset-token',
Model(Schema.verifyOtp, 'payload'),
AuthMiddleware.verifyAdminVerificationToken,
AuthController.generateAdminPasswordResetToken
);

router.post('/reset-password',
AuthMiddleware.validateAdminAuthenticationToken,
Model(Schema.setPassword, 'payload'),
// AuthMiddleware.compareAdminPassword,
AuthController.resetPassword
)

export default router;
