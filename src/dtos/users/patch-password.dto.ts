import { passwordType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

interface Password {
    oldPassword: string;
    newPassword: string;
}

const patchPasswordSchema: JSONSchemaType<Password> = {
    type: 'object',
    properties: {
        oldPassword: passwordType,
        newPassword: passwordType
    },
    required: ['oldPassword', 'newPassword'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const patchPasswordSchemaDTO = ajv.compile(patchPasswordSchema);
