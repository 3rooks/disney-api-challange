import { emailType, passwordType, usernameType } from '@constants/dto-types';
import { Register } from '@interfaces/auth/register.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv/dist/core';

const registerSchema: JSONSchemaType<Register> = {
    type: 'object',
    properties: {
        username: usernameType,
        email: emailType,
        password: passwordType
    },
    required: ['username', 'email', 'password'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const registerSchemaDTO = ajv.compile(registerSchema);
