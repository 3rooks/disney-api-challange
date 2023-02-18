import { usernameType } from '@constants/dto-types';
import { IUser } from '@interfaces/user.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

type User = Pick<IUser, 'username'>;

const patchUsernameSchema: JSONSchemaType<User> = {
    type: 'object',
    properties: {
        username: usernameType
    },
    required: ['username'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const patchUsernameSchemaDTO = ajv.compile(patchUsernameSchema);
