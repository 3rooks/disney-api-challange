import { idType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface IdGender {
    idGender: string;
}

const idCharacterSchema: JSONSchemaType<IdGender> = {
    type: 'object',
    properties: {
        idGender: idType
    },
    required: ['idGender'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const idGenderSchemaDTO = ajv.compile(idCharacterSchema);

export const idGenderDTOParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { idGender } = req.params;
    const isValid = idGenderSchemaDTO({ idGender });

    if (!isValid)
        return res.status(400).json({
            errors: idGenderSchemaDTO.errors?.map((error) => error.message)
        });

    return next();
};
