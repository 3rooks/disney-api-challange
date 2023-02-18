import { idType } from '@constants/dto-types';
import { ICharacterMovie } from '@interfaces/character.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

const postMovieSchema: JSONSchemaType<ICharacterMovie> = {
    type: 'object',
    properties: {
        movie: idType
    },
    required: ['movie'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const postMovieSchemaDTO = ajv.compile(postMovieSchema);
