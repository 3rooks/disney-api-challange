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
        this.router.patch(
            '/auth/username',
            this.dto.auth,
            this.dto.body.patchUsername,
            this.ctrl.patchUsername
        );

        this.router.patch(
            '/auth/email',
            this.dto.auth,
            this.dto.body.patchEmail,
            this.ctrl.patchEmail
        );

        this.router.patch(
            '/auth/password',
            this.dto.auth,
            this.dto.body.patchPassword,
            this.ctrl.patchPassword
        );

        this.router.delete(
            '/auth/unregister',
            this.dto.auth,
            this.dto.body.deleteUser,
            this.ctrl.deleteUser
        );
    };
}
