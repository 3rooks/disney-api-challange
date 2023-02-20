import { ageType, releaseYearType, usernameType } from '@constants/dto-types';
import { IMovie } from '@interfaces/movie.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type Movie = Omit<IMovie, '_id' | 'characters' | 'createdAt' | 'updatedAt'>;

const postMovieSchema: JSONSchemaType<Movie> = {
    type: 'object',
    properties: {
        title: usernameType,
        image: usernameType,
        rated: ageType,
        releaseYear: releaseYearType
    },
    required: ['title', 'image', 'rated', 'releaseYear'],
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
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { title, image, rated, releaseYear } = req.body;

    req.body = {
        title: String(title),
        image: String(image),
        rated: Number(rated),
        releaseYear: Number(releaseYear)
    };

    return next();
};
