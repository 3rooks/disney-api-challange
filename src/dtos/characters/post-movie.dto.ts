import { idType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface PostMovie {
    idCharacter: string;
    movie: string;
}

const postCharacterSchema: JSONSchemaType<PostMovie> = {
    type: 'object',
    properties: {
        idCharacter: idType,
        movie: idType
    },
    required: ['idCharacter', 'movie'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(postCharacterSchema);

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

    const { idCharacter } = req.params;
    const { movie } = req.body;

    req.params = {
        idCharacter
    };

    req.body = {
        movie: String(movie)
    };

    return next();
};
