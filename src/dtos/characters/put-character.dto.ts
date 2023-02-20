import {
    ageType,
    historyType,
    idType,
    imageType,
    titleType
} from '@constants/dto-types';
import { ICharacter } from '@interfaces/character.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type Character = Omit<ICharacter, '_id' | 'movies' | 'createdAt' | 'updatedAt'>;

interface PutCharacter extends Character {
    idCharacter: string;
}

const putCharacterSchema: JSONSchemaType<PutCharacter> = {
    type: 'object',
    properties: {
        idCharacter: idType,
        name: titleType,
        image: imageType,
        age: ageType,
        history: historyType
    },
    required: ['idCharacter', 'name', 'image', 'age', 'history'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(putCharacterSchema);

export const putCharacterDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema({ ...req.params, ...req.body });

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { idCharacter } = req.params;
    const { name, image, age, history } = req.body;

    req.params = {
        idCharacter
    };

    req.body = {
        name: String(name),
        image: String(image),
        age: Number(age),
        history: String(history)
    };

    return next();
};
