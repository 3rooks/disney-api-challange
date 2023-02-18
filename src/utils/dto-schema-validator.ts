import { ValidateFunction } from 'ajv';
import { NextFunction, Request, Response } from 'express';

export const validateDTOSchema =
    (validateFn: ValidateFunction) =>
    (req: Request, res: Response, next: NextFunction) => {
        const isValid = validateFn(req.body);

        if (!isValid)
            return res.status(400).json({
                errors: validateFn.errors?.map((error) => error.message)
            });

        return next();
    };
