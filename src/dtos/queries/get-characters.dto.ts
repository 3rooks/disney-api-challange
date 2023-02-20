import { ageType, idType, titleType } from '@constants/dto-types';
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
        name: titleType,
        movie: idType,
        age: ageType
    },
    required: [],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const validateSchema = ajv.compile(getCharactersSchema);

export const getCharacterDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, movie, age } = req.query;

    const isValid = validateSchema({
        ...req.query,
        age: !age
            ? undefined
            : Number.isNaN(Number(age))
            ? String(age)
            : Number(age)
    });

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    req.query = {};

    req.body = {
        name: name ? String(name) : undefined,
        movie: movie ? String(movie) : undefined,
        age: !Number.isNaN(Number(age)) ? Number(age) : undefined
    };

    return next();
};
