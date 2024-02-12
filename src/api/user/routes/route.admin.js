import { Router } from 'express';
import ApiResponse from '../../../lib/http/lib.http.responses';
// import { hashPassword } from '../../../util';
import Model from '../middlewares/middlewares.model'
import Schema from '../../../lib/schemas/admin/lib.schema.admin'
// import * as AdminMiddleware from '../middlewares/middlewares.auth'
import * as AuthMiddleware from '../middlewares/middlewares.auth';
import * as AdminController from '../controllers/admin.controller';
import * as AdminMiddleware from '../middlewares/middlewares.admin';
import * as csvUpload from '../../../config/csv/index';
import upload from '../../../config/s3/index';


const router = Router();

router.get(
  // eslint-disable-next-line no-unused-vars
  '/', (req, res) => {
    return ApiResponse.success(res, 'Admin Route is reachable', 200);
  }
);

router.post('/signup-member',
upload.single('profile_image'),
Model(Schema.addMember, 'payload'),
AuthMiddleware.validateAdminAuthenticationToken,
AuthMiddleware.checkIfMemberEmailAlreadyExist,
AdminController.signUpMember
);

router.post('/csv-upload',
AuthMiddleware.validateAdminAuthenticationToken,
// AuthMiddleware.checkIfMemberEmailAlreadyExist,
csvUpload.uploadCsvFile
)

router.delete('/:id',
AuthMiddleware.validateAdminAuthenticationToken,
AdminController.deleteMember
);

router.put('/:id',
Model(Schema.editMember, 'payload'),
AuthMiddleware.validateAdminAuthenticationToken,
AuthMiddleware.checkIfMemberIdExist,
AdminController.editMember
);

router.get('/fetch-members',
AuthMiddleware.validateAdminAuthenticationToken,
Model(Schema.fetchMembers, 'query'),
AdminController.fetchMembers
);

router.get('/get-total',
AuthMiddleware.validateAdminAuthenticationToken,
AdminController.getTotal
);

router.get('/get-recent-members',
AuthMiddleware.validateAdminAuthenticationToken,
AdminController.recentlyAddedMembers
);


router.get('/get-recent-clock-in',
AuthMiddleware.validateAdminAuthenticationToken,

AdminController.recentlyClockInMembers
);

router.get('/get-clocks-time',
AuthMiddleware.validateAdminAuthenticationToken,
Model(Schema.fetchMembers, 'query'),
AdminController.fetchAllMembersWithClockInAndClockOut
);

router.post('/change-password',
AuthMiddleware.validateAdminAuthenticationToken,
Model(Schema.setNewPassword, 'payload'),
AdminMiddleware.validateUnAuthenticatedAdmin('verify'),
AdminController.changeAdminPassword
)

export default router;