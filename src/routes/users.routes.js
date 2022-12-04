import {
    userLoginCtrl,
    userRegisterCtrl,
    userUnregisterCtrl
} from '#controllers/users.controller.js';
import { userLoginDTO } from '#dtos/users/users-login.dto.js';
import { userRegisterDTO } from '#dtos/users/users-register.dto.js';
import { userUnregisterDTO } from '#dtos/users/users-unregister.dto.js';

import { Router } from 'express';

const usersRoute = Router();

usersRoute.post('/auth/register', userRegisterDTO, userRegisterCtrl);

usersRoute.post('/auth/login', userLoginDTO, userLoginCtrl);

usersRoute.delete('/auth/unregister', userUnregisterDTO, userUnregisterCtrl);

export default usersRoute;
