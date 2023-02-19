import {
    idType,
    imageDTOSchema,
    quantityDTOSchema
} from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface CharactersQuery {
    name: string;
    movie: string;
    age: number;
}

const getCharactersSchema: JSONSchemaType<CharactersQuery> = {
    type: 'object',
    properties: {
        name: imageDTOSchema,
        movie: idType,
        age: quantityDTOSchema
    },
    required: [],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const getCharactersSchemaDTO = ajv.compile(getCharactersSchema);

export const getCharacterDTOQueries = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, movie, age: ageString } = req.query;
    const age = Number(ageString);

    let isValid;

    if (!ageString && Number.isNaN(age)) {
        isValid = getCharactersSchemaDTO({ name, movie });
    } else {
        isValid = getCharactersSchemaDTO({ name, movie, age });
    }

    if (!isValid)
        return res.status(400).json({
            errors: getCharactersSchemaDTO.errors?.map((error) => error.message)
        });

    return next();
};
