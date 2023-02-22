import { idType, usernameType } from '@constants/dto-types';
import { IUser } from '@interfaces/user.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type User = Pick<IUser, 'username'>;

interface PatchUsername extends User {
    id: string;
}

const patchUsernameSchema: JSONSchemaType<PatchUsername> = {
    type: 'object',
    properties: {
        id: idType,
        username: usernameType
    },
    required: ['id', 'username'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(patchUsernameSchema);

export const patchUsernameDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { id, username } = req.body;

    req.body = {
        id: String(id),
        username: String(username)
    };

    return next();
};
