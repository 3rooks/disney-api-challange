import { authDTO } from '@dtos/users/auth.dto';
import { deleteUserDTO } from './delete-user.dto';
import { loginDTO } from './login.dto';
import { patchEmailDTO } from './patch-email.dto';
import { patchPasswordDTO } from './patch-password.dto';
import { patchUsernameDTO } from './path-username.dto';
import { registerDTO } from './register.dto';

export class UserDTO {
    readonly auth = authDTO;
    readonly login = loginDTO;
    readonly register = registerDTO;
    readonly patchUsername = patchUsernameDTO;
    readonly patchEmail = patchEmailDTO;
    readonly patchPassword = patchPasswordDTO;
    readonly deleteUser = deleteUserDTO;
}
