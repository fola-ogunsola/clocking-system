import { Router } from 'express';
import authRoute from '../../api/user/routes/routes.auth';
import adminRoute from '../../api/user/routes/route.admin';
import memberRoute from '../../api/user/routes/route.member';

const router = Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/member', memberRoute)


export default router;
