import { validateUserBody, validateAuthLogin } from '../validators';
import { signin, signup } from '../controllers/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', validateUserBody, signup);
authRouter.post('/signin', validateAuthLogin, signin);

export default authRouter;