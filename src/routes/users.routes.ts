import { UserController } from '@controllers/users.controller';
import userAuth from '@utils/user-auth';
import { Router } from 'express';

const { deleteUser, patchEmail, patchUsername, patchPassword } =
    new UserController();

const usersRoute = Router();

usersRoute.patch('/auth/username', userAuth, patchUsername);

usersRoute.patch('/auth/email', userAuth, patchEmail);

usersRoute.patch('/auth/password', userAuth, patchPassword);

usersRoute.delete('/auth/unregister', userAuth, deleteUser);

export default usersRoute;
