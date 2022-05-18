import { Router } from 'express';

import * as UserController from '../controller/UserController';

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.delete('/', UserController.deleteUser);

export default userRouter;
