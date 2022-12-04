import { passwordType } from '#constants/dto-types.js';
import { ajv } from '#lib/ajv.js';
import { Type } from '@sinclair/typebox';

const userUnregisterDTOSchema = Type.Object(
    {
        password: passwordType
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: 'Invalid JSON Schema '
        }
    }
);

const validateSchema = ajv.compile(userUnregisterDTOSchema);

export const userUnregisterDTO = (req, res, next) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors.map((error) => error.message)
        });

    next();
};
