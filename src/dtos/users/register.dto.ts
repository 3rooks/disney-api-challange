import { emailType, passwordType, usernameType } from '@constants/dto-types';
import { IUser } from '@interfaces/user.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type User = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;

const registerSchema: JSONSchemaType<User> = {
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

const validateSchema = ajv.compile(registerSchema);

export const registerDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { username, email, password } = req.body;

    req.body = {
        username: String(username),
        email: String(email),
        password: String(password)
    };

    return next();
};
