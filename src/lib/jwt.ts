import { Secret, sign, SignOptions, verify } from 'jsonwebtoken';

const jwtSecret: Secret = process.env.JWT_PRIVATE_KEY || 'default_jwt_secret';
const signOptions: SignOptions = { algorithm: 'HS512', expiresIn: '7d' };

export interface Payload {
    id: string;
}

export const signAsync = (payload: Payload) =>
    new Promise((resolve, reject) => {
        sign(payload, jwtSecret, signOptions, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });

export const verifyAsync = (token: string) =>
    new Promise((resolve, reject) => {
        verify(token, jwtSecret, (err, payload) => {
            if (err) reject(err);
            else resolve(payload);
        });
    });
