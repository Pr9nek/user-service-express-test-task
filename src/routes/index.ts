import { Router } from 'express';
import authRouter from './auth';
import usersRouter from './users';
import { auth } from '../middlewares/auth';

const router = Router();

router.use('/', authRouter); 
router.use('/users', auth, usersRouter); 

export default router;