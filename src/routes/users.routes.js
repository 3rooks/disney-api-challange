import { UserController } from '#controllers/users.controller.js';
import userAuth from '#utils/user-auth.js';
import { Router } from 'express';

const { postRegister, postLogin, deleteUser } = new UserController();

const usersRoute = Router();

usersRoute.post('/auth/register', postRegister);

usersRoute.post('/auth/login', postLogin);

usersRoute.delete('/auth/unregister', userAuth, deleteUser);

export default usersRoute;
