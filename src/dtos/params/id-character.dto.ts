import { idType } from '@constants/dto-types';
import { ajv } from '@lib/ajv';
import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';

interface IdCharacter {
    idCharacter: string;
}

const idCharacterSchema: JSONSchemaType<IdCharacter> = {
    type: 'object',
    properties: {
        idCharacter: idType
    },
    required: ['idCharacter'],
    additionalProperties: false,
    errorMessage: {
        additionalProperties: 'Invalid JSON Schema'
    }
};

const idCharacterSchemaDTO = ajv.compile(idCharacterSchema);

export const idCharacterDTOParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { idCharacter } = req.params;
    const isValid = idCharacterSchemaDTO({ idCharacter });

    if (!isValid)
        return res.status(400).json({
            errors: idCharacterSchemaDTO.errors?.map((error) => error.message)
        });

    return next();
};
