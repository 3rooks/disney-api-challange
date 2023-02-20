import { idType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface Params {
    idMovie: string;
    idGender: string;
    idCharacter: string;
}

const getByParamsSchema: JSONSchemaType<Params> = {
    type: 'object',
    properties: {
        idMovie: idType,
        idGender: idType,
        idCharacter: idType
    },
    required: [],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const validateSchema = ajv.compile(getByParamsSchema);

export const getByParamsDTO = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isValid = validateSchema(req.params);

    if (!isValid)
        return res.status(400).json({
            errors: validateSchema.errors?.map((error) => error.message)
        });

    const { idMovie, idGender, idCharacter } = req.params;

    req.params = {
        idMovie,
        idGender,
        idCharacter
    };

    return next();
};
