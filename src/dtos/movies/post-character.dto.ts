import { idType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface PostCharacter {
    idMovie: string;
    character: string;
}

const postCharacterSchema: JSONSchemaType<PostCharacter> = {
    type: 'object',
    properties: {
        idMovie: idType,
        character: idType
    },
    required: ['idMovie', 'character'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(postCharacterSchema);

export const postCharacterDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema({ ...req.params, ...req.body });

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { idMovie } = req.params;
    const { character } = req.body;

    req.params = {
        idMovie
    };

    req.body = {
        character: String(character)
    };

    return next();
};
