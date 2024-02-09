import { Router } from 'express';
import ApiResponse from '../../../lib/http/lib.http.responses';
import Model from '../middlewares/middlewares.model'
import Schema from '../../../lib/schemas/admin/lib.schema.admin'
import * as MemberController from '../controllers/member.controller'
import * as AuthMiddleware from '../middlewares/middlewares.auth';


const router = Router();

router.get(
  // eslint-disable-next-line no-unused-vars
  '/', (req, res) => {
    return ApiResponse.success(res, 'Member Route is reachable', 200);
  }
);


router.get('/fetch-one-member',
Model(Schema.fetchOneMember, 'query'),
MemberController.fetchOneMenber
);


router.post('/clock-in/:id',
AuthMiddleware.checkIfMemberIdExist,
MemberController.clockInMember
);

router.post('/clock-out/:id', 
MemberController.clockOutMember
);

export default router;