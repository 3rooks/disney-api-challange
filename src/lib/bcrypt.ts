import bcrypt from 'bcrypt';

const { genSalt, hash, compare } = bcrypt;

export const createHash = async (password: String) =>
    await hash(password, await genSalt(10));

export const compareHash = async (password: String, user: Object) =>
    await compare(password, user.password);
