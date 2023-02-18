import { idType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface IdMovie {
    idMovie: string;
}

const idMovieSchema: JSONSchemaType<IdMovie> = {
    type: 'object',
    properties: {
        idMovie: idType
    },
    required: ['idMovie'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const idMovieSchemaDTO = ajv.compile(idMovieSchema);

export const idMovieDTOParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { idMovie } = req.params;
    const isValid = idMovieSchemaDTO({ idMovie });

    if (!isValid)
        return res.status(400).json({
            errors: idMovieSchemaDTO.errors?.map((error) => error.message)
        });

    return next();
};
