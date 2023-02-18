import { priceDTOSchema, usernameType } from '@constants/dto-types';
import { IMovie } from '@interfaces/movie.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

type Movie = Omit<IMovie, '_id' | 'characters' | 'createdAt' | 'updatedAt'>;

const postMovieSchema: JSONSchemaType<Movie> = {
    type: 'object',
    properties: {
        title: usernameType,
        image: usernameType,
        rated: priceDTOSchema,
        releaseYear: priceDTOSchema
    },
    required: ['title', 'image', 'rated', 'releaseYear'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const postMovieSchemaDTO = ajv.compile(postMovieSchema);
