import { Router } from 'express';
import { getUserById, getUsers, blockUser } from '../controllers/users';
import { validateUserId } from '../validators';

const userRouter = Router();

userRouter.get('/', getUsers); // GET /users
userRouter.get('/:id', validateUserId, getUserById); // GET /users/:id
userRouter.patch('/:id/block', validateUserId, blockUser); // PATCH /users/:id/block

export default userRouter;