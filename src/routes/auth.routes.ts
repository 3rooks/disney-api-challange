import { AuthController } from '@controllers/auth.controller';
import { Router } from 'express';

const { login, register } = new AuthController();

const authRoute = Router();

authRoute.post('/auth/register', register);
authRoute.post('/auth/login', login);

export default authRoute;
