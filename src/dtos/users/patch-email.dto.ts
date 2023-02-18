import { emailType } from '@constants/dto-types';
import { IUser } from '@interfaces/user.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

type User = Pick<IUser, 'email'>;

const patchEmailSchema: JSONSchemaType<User> = {
    type: 'object',
    properties: {
        email: emailType
    },
    required: ['email'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const patchEmailSchemaDTO = ajv.compile(patchEmailSchema);
