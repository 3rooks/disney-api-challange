import { validateDTOSchema } from '@utils/dto-schema-validator';
import { loginSchemaDTO } from './login.dto';
import { registerSchemaDTO } from './register.dto';

const loginDTOBody = validateDTOSchema(loginSchemaDTO);
const registerDTOBody = validateDTOSchema(registerSchemaDTO);

export class AuthDTO {
    readonly login = loginDTOBody;
    readonly register = registerDTOBody;
}
