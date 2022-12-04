import { emailType, passwordType, usernameType } from '#constants/dto-types.js';
import { ajv } from '#lib/ajv.js';
import { Type } from '@sinclair/typebox';

const userRegisterDTOSchema = Type.Object(
    {
        username: usernameType,
        email: emailType,
        password: passwordType
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'Invalid JSON Schema '
        }
    }
);

const validateSchema = ajv.compile(userRegisterDTOSchema);

export const userRegisterDTO = (req, res, next) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors.map((error) => error.message)
        });

    next();
};
