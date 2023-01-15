import { verifyAsync } from '@lib/jwt';
import { NextFunction, Request, Response } from 'express';

export interface ReqAuth extends Request {
    id: string;
}

const userAuth = async () => {
    return (req: ReqAuth, res: Response, next: NextFunction) => {
        try {
            const { authorization } = req.headers;
            if (!authorization)
                return res.status(401).json({ errors: 'user unauthorized' });

            const jwt: String = authorization.split(' ')[1];
            if (!jwt)
                return res.status(401).json({ errors: 'user unauthorized' });

            const payload = verifyAsync(jwt.toString());
            req.id = payload.id;

            return next();
        } catch (error) {
            return res.status(401).json({ errors: 'user unauthorized' });
        }
    };
};

export default userAuth;
