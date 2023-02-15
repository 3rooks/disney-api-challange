import { NextFunction, Request, Response } from 'express';

export abstract class HandlerError {
    protected handlerError =
        (handler: Function) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await handler(req, res, next);
            } catch (error) {
                next(error);
            }
        };
}
