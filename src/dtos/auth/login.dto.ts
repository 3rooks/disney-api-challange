import { emailType, passwordType } from '@constants/dto-types';
import { Login } from '@interfaces/auth/login.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

const loginSchema: JSONSchemaType<Login> = {
    type: 'object',
    properties: {
        email: emailType,
        password: passwordType
    },
    required: ['email', 'password'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const loginSchemaDTO = ajv.compile(loginSchema);
