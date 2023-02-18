import { priceDTOSchema, usernameType } from '@constants/dto-types';
import { ICharacter } from '@interfaces/character.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';

type Character = Omit<ICharacter, '_id' | 'movies' | 'createdAt' | 'updatedAt'>;

const postCharacterSchema: JSONSchemaType<Character> = {
    type: 'object',
    properties: {
        name: usernameType,
        image: usernameType,
        age: priceDTOSchema,
        history: usernameType
    },
    required: ['name', 'image', 'age', 'history'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

export const postCharacterSchemaDTO = ajv.compile(postCharacterSchema);
