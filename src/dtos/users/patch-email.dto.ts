import { emailType, idType } from '@constants/dto-types';
import { IUser } from '@interfaces/user.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type User = Pick<IUser, 'email'>;

interface PatchEmail extends User {
    id: string;
}

const patchEmailSchema: JSONSchemaType<PatchEmail> = {
    type: 'object',
    properties: {
        id: idType,
        email: emailType
    },
    required: ['id', 'email'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(patchEmailSchema);

export const patchEmailDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { id, email } = req.body;

    req.body = {
        id: String(id),
        email: String(email)
    };

    return next();
};
