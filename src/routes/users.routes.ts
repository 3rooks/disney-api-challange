import { UserController } from '@controllers/users.controller';
import { UserDTO } from '@dtos/users/user.dto';
import { Router } from 'express';

export class UserRoutes {
    constructor(
        readonly router: Router,
        private dto: UserDTO,
        private ctrl: UserController
    ) {
        this.init();
    }

    private init = () => {
        this.router.post('/auth/login', this.dto.login, this.ctrl.login);
        this.router.post(
            '/auth/register',
            this.dto.register,
            this.ctrl.register
        );

        this.router.patch(
            '/auth/username',
            this.dto.auth,
            this.dto.patchUsername,
            this.ctrl.patchUsername
        );

        this.router.patch(
            '/auth/email',
            this.dto.auth,
            this.dto.patchEmail,
            this.ctrl.patchEmail
        );

        this.router.patch(
            '/auth/password',
            this.dto.auth,
            this.dto.patchPassword,
            this.ctrl.patchPassword
        );

        this.router.delete(
            '/auth/unregister',
            this.dto.auth,
            this.dto.deleteUser,
            this.ctrl.deleteUser
        );
    };
}
