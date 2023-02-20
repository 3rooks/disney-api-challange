import {
    idType,
    imageType,
    ratedType,
    releaseYearType,
    titleType
} from '@constants/dto-types';
import { IMovie } from '@interfaces/movie.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type Movie = Omit<IMovie, '_id' | 'characters' | 'createdAt' | 'updatedAt'>;

interface PutMovie extends Movie {
    idMovie: string;
}

const putMovieSchema: JSONSchemaType<PutMovie> = {
    type: 'object',
    properties: {
        idMovie: idType,
        title: titleType,
        image: imageType,
        rated: ratedType,
        releaseYear: releaseYearType
    },
    required: ['idMovie', 'title', 'image', 'rated', 'releaseYear'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(putMovieSchema);

export const putMovieDTO = (
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
    const { title, image, rated, releaseYear } = req.body;

    req.params = {
        idMovie
    };

    req.body = {
        title: String(title),
        image: String(image),
        rated: Number(rated),
        releaseYear: Number(releaseYear)
    };

    return next();
};
