import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_PRIVATE_KEY || 'default_jwt_secret';
const signOptions = { algorithm: 'HS512', expiresIn: '7d' };

export const signAsync = (payload: Object) =>
    new Promise((resolve, reject) => {
        jwt.sign(payload, jwtSecret, signOptions, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });

export const verifyAsync = (token: String) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, payload) => {
            if (err) reject(err);
            else resolve(payload);
        });
    });
