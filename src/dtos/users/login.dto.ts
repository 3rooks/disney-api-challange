import { emailType, passwordType } from '@constants/dto-types';
import { IUser } from '@interfaces/user.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv/dist/core';
import { NextFunction, Request, Response } from 'express';

type User = Omit<IUser, '_id' | 'username' | 'createdAt' | 'updatedAt'>;

const loginSchema: JSONSchemaType<User> = {
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

const validateSchema = ajv.compile(loginSchema);

export const loginDTO = (req: Request, res: Response, next: NextFunction) => {
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { email, password } = req.body;

    req.body = {
        email: String(email),
        password: String(password)
    };

    return next();
};
