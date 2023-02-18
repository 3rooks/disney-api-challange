import { passwordType } from '@constants/dto-types';
import { IUser } from '@interfaces/user.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

type User = Pick<IUser, 'password'>;

const deleteUserSchema: JSONSchemaType<User> = {
    type: 'object',
    properties: {
        password: passwordType
    },
    required: ['password'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const deleteUserSchemaDTO = ajv.compile(deleteUserSchema);
