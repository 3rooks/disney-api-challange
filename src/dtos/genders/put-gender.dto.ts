import { idType, imageType, titleType } from '@constants/dto-types';
import { IGender } from '@interfaces/gender.interface';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

type Gender = Omit<IGender, '_id' | 'movies' | 'createdAt' | 'updatedAt'>;

interface PutGender extends Gender {
    idGender: string;
}

const putGenderSchema: JSONSchemaType<PutGender> = {
    type: 'object',
    properties: {
        idGender: idType,
        name: titleType,
        image: imageType
    },
    required: ['idGender', 'name', 'image'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(putGenderSchema);

export const putGenderDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema({ ...req.params, ...req.body });

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { idGender } = req.params;
    const { name, image } = req.body;

    req.params = {
        idGender
    };

    req.body = {
        name: String(name),
        image: String(image)
    };

    return next();
};
