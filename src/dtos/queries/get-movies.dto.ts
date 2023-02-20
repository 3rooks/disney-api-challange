import { idType, orderType, titleType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface MoviesQuery {
    title: string;
    order: string;
    gender: string;
}

const getMoviesSchema: JSONSchemaType<MoviesQuery> = {
    type: 'object',
    properties: {
        title: titleType,
        order: orderType,
        gender: idType
    },
    required: [],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(getMoviesSchema);

export const getMoviesDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema(req.query);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { title, order, gender } = req.query;

    req.query = {
        title: title ? String(title) : undefined,
        gender: gender ? String(gender) : undefined,
        order: order ? String(order).toUpperCase() : undefined
    };

    return next();
};
