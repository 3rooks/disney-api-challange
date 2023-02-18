import { usernameType } from '@constants/dto-types';
import { IGender } from '@interfaces/gender.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

type Gender = Omit<IGender, '_id' | 'movies' | 'createdAt' | 'updatedAt'>;

const postGenderSchema: JSONSchemaType<Gender> = {
    type: 'object',
    properties: {
        name: usernameType,
        image: usernameType
    },
    required: ['name', 'image'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const postGenderSchemaDTO = ajv.compile(postGenderSchema);
