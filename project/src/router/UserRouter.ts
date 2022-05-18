import { Router } from 'express';

import * as UserController from '../controller/UserController';
import * as UserMiddleware from '../middleware/UserMiddleware';

const userRouter = Router();

userRouter.post('/', UserMiddleware.createUser, UserController.createUser);
userRouter.delete('/', UserController.deleteUser);

export default userRouter;
