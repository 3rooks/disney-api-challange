import { verifyAsync } from '@lib/jwt';

const userAuth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            return res.status(401).json({ errors: 'user unauthorized' });

        const jwt: String = authorization.split(' ')[1];
        if (!jwt) return res.status(401).json({ errors: 'user unauthorized' });

        const payload = await verifyAsync(jwt);
        req.id = payload.id;

        next();
    } catch (error) {
        return res.status(401).json({ errors: 'user unauthorized' });
    }
};

export default userAuth;
