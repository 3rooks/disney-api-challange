import { idType, passwordType } from '@constants/dto-types';
import { IUser } from '@interfaces/user.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type User = Pick<IUser, 'password'>;

interface DeleteUser extends User {
    id: string;
}

const deleteUserSchema: JSONSchemaType<DeleteUser> = {
    type: 'object',
    properties: {
        id: idType,
        password: passwordType
    },
    required: ['id', 'password'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(deleteUserSchema);

export const deleteUserDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { id, password } = req.body;

    req.body = {
        id: String(id),
        password: String(password)
    };

    return next();
};
