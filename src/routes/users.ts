import { Router } from 'express';
import { getUserById, getUsers, blockUser } from '../controllers/users';
import { validateUserId } from '../validators';

const userRouter = Router();

userRouter.get('/', getUsers); 
userRouter.get('/:id', validateUserId, getUserById); 
userRouter.patch('/:id/block', validateUserId, blockUser); 

export default userRouter;