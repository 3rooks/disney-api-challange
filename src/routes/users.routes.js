import { UserController } from '#controllers/users.controller.js';
import userAuth from '#utils/user-auth.js';
import { Router } from 'express';

const {
    postLogin,
    deleteUser,
    patchEmail,
    postRegister,
    patchUsername,
    patchPassword
} = new UserController();

const usersRoute = Router();

usersRoute.post('/auth/register', postRegister);

usersRoute.post('/auth/login', postLogin);

usersRoute.patch('/auth/username', userAuth, patchUsername);

usersRoute.patch('/auth/email', userAuth, patchEmail);

usersRoute.patch('/auth/password', userAuth, patchPassword);

usersRoute.delete('/auth/unregister', userAuth, deleteUser);

export default usersRoute;
