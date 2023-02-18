import { AuthController } from '@controllers/auth.controller';
import { AuthDTO } from '@dtos/auth/auth.dto';
import { Router } from 'express';
export class AuthRoutes {
    private login = '/auth/login';
    private register = '/auth/register';

    constructor(
        readonly router: Router,
        private dto: AuthDTO,
        private ctrl: AuthController
    ) {
        this.init();
    }

    private init = () => {
        this.router.post(this.login, this.dto.login, this.ctrl.login);
        this.router.post(this.register, this.dto.register, this.ctrl.register);
    };
}
