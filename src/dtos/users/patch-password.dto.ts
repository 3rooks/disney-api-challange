import { idType, passwordType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface Password {
    id: string;
    oldPassword: string;
    newPassword: string;
}

const patchPasswordSchema: JSONSchemaType<Password> = {
    type: 'object',
    properties: {
        id: idType,
        oldPassword: passwordType,
        newPassword: passwordType
    },
    required: ['id', 'oldPassword', 'newPassword'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(patchPasswordSchema);

export const patchPasswordDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { id, oldPassword, newPassword } = req.body;

    req.body = {
        id: String(id),
        oldPassword: String(oldPassword),
        newPassword: String(newPassword)
    };

    return next();
};
