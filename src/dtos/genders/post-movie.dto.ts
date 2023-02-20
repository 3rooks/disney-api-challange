import { idType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface PostMovie {
    idGender: string;
    movie: string;
}

const postMovieSchema: JSONSchemaType<PostMovie> = {
    type: 'object',
    properties: {
        idGender: idType,
        movie: idType
    },
    required: ['idGender', 'movie'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(postMovieSchema);

export const postMovieDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema({ ...req.params, ...req.body });

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { idGender } = req.params;
    const { movie } = req.body;

    req.params = {
        idGender
    };

    req.body = {
        movie: String(movie)
    };

    return next();
};
