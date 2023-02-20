import {
    ageType,
    historyType,
    imageType,
    titleType
} from '@constants/dto-types';
import { ICharacter } from '@interfaces/character.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type Character = Omit<ICharacter, '_id' | 'movies' | 'createdAt' | 'updatedAt'>;

const postCharacterSchema: JSONSchemaType<Character> = {
    type: 'object',
    properties: {
        name: titleType,
        image: imageType,
        age: ageType,
        history: historyType
    },
    required: ['name', 'image', 'age', 'history'],
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
    const isValid = validateSchema(req.body);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { name, image, age, history } = req.body;

    req.body = {
        name: String(name),
        image: String(image),
        age: Number(age),
        history: String(history)
    };

    return next();
};
