import { IUser } from '@interfaces/user.interface';
import bcrypt from 'bcrypt';

const { genSalt, hash, compare } = bcrypt;

export const createHash = async (password: string) =>
    await hash(password, await genSalt(10));

export const compareHash = async (password: string, user: IUser) =>
    await compare(password, user.password);
