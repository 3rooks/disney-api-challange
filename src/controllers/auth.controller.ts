import { compareHash, createHash } from '@lib/bcrypt';
import { signAsync } from '@lib/jwt';
import { UserService } from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class AuthController extends HandlerError {
    private try = this.handlerError;

    public login = this.try(login);

    public register = this.try(register);
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserService.getUserBy({ email });
    if (!user) return res.status(401).json({ errors: 'user unauthorized' });

    const equalPassword = await compareHash(password, user);
    if (!equalPassword)
        return res.status(401).json({ errors: 'user unauthorized' });

    const payload = { id: user._id };

    const token = signAsync(payload);

    return res.status(200).json({ token });
};

const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existUser = await UserService.getUserBy({ email });
    if (existUser) return res.status(409).json({ errors: 'user conflict' });

    const passwordHashed = await createHash(password);

    const user = { username, email, password: passwordHashed };

    await UserService.registerUser(user);

    return res.status(201).json({ results: 'user created' });
};
