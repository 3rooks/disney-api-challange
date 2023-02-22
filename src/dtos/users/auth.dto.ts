import { verifyAsync } from '@lib/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export const authDTO = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { authorization } = req.headers;

        if (!authorization)
            return res.status(401).json({ errors: 'user unauthorized' });

        const [, token] = authorization.split(' ');

        if (!token)
            return res.status(401).json({ errors: 'user unauthorized' });

        const payload = verifyAsync(token) as JwtPayload;

        req.body = {
            id: String(payload.id)
        };

        return next();
    } catch (error) {
        return res.status(401).json({ errors: 'user unauthorized' });
    }
};
