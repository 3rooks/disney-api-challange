import { validateDTOSchema } from '@utils/dto-schema-validator';
import userAuth from '@utils/user-auth';
import { deleteUserSchemaDTO } from './delete-user.dto';
import { patchEmailSchemaDTO } from './patch-email.dto';
import { patchPasswordSchemaDTO } from './patch-password.dto';
import { patchUsernameSchemaDTO } from './path-username.dto';

const deleteUserDTOBody = validateDTOSchema(deleteUserSchemaDTO);
const patchEmailDTOBody = validateDTOSchema(patchEmailSchemaDTO);
const patchPasswordDTOBody = validateDTOSchema(patchPasswordSchemaDTO);
const patchUsernameMovieDTOBody = validateDTOSchema(patchUsernameSchemaDTO);

export class UserDTO {
    readonly auth = userAuth;

    readonly params = {};

    readonly body = {
        deleteUser: deleteUserDTOBody,
        patchEmail: patchEmailDTOBody,
        patchPassword: patchPasswordDTOBody,
        patchUsername: patchUsernameMovieDTOBody
    };
}
