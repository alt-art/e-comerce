import { Router } from 'express';

import userRouter from './UserRouter';

const router = Router();

router.use('/user', userRouter);

export default router;
