import { compareHash, createHash } from '@lib/bcrypt';
import { signAsync } from '@lib/jwt';
import { RepositoryService } from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class UserController extends HandlerError {
    private try = this.handlerError;

    constructor(readonly service: RepositoryService) {
        super();
    }
    public register = this.try(async (req: Register, res: Response) => {
        const { email, password } = req.body;

        const existUser = await this.service.users.getUserBy({ email });
        if (existUser) return res.status(409).json({ errors: 'user conflict' });

        await this.service.users.registerUser({
            ...req.body,
            password: await createHash(password)
        });

        return res.status(201).json({ results: 'user created' });
    });

    public login = this.try(async (req: Login, res: Response) => {
        const { email, password } = req.body;

        const user = await this.service.users.getUserBy({ email });
        if (!user) return res.status(401).json({ errors: 'user unauthorized' });

        const equalPassword = await compareHash(password, user);
        if (!equalPassword)
            return res.status(401).json({ errors: 'user unauthorized' });

        const payload = { id: String(user._id) };
        const token = signAsync(payload);

        return res.status(200).json({ token });
    });

    public patchUsername = this.try(
        async (req: PatchUsername, res: Response) => {
            const { id, username } = req.body;

            const user = await this.service.users.getUserById(id);
            if (!user)
                return res.status(404).json({ errors: 'user not found' });

            await this.service.users.updateUserById(id, { ...user, username });

            return res.status(200).json({ results: 'user updated' });
        }
    );

    public patchEmail = this.try(async (req: PatchEmail, res: Response) => {
        const { id, email } = req.body;

        const user = await this.service.users.getUserById(id);
        if (!user) return res.status(404).json({ errors: 'user not found' });

        await this.service.users.updateUserById(id, { ...user, email });
        return res.status(200).json({ results: 'user updated' });
    });

    public patchPassword = this.try(
        async (req: patchPassword, res: Response) => {
            const { id, oldPassword, newPassword } = req.body;

            const user = await this.service.users.getUserById(id);
            if (!user)
                return res.status(404).json({ errors: 'user not found' });

            const checkPassword = await compareHash(oldPassword, user);
            if (!checkPassword)
                return res.status(401).json({ errors: 'unauthorized' });

            await this.service.users.updateUserById(id, {
                ...user,
                password: await createHash(newPassword)
            });

            return res.status(200).json({ results: 'user updated' });
        }
    );

    public deleteUser = this.try(async (req: Request, res: Response) => {
        const { id, password } = req.body;

        const existUser = await this.service.users.getUserById(id);

        if (!existUser)
            return res.status(401).json({ errors: 'user unauthorized' });

        const equalPassword = await compareHash(password, existUser);
        if (!equalPassword)
            return res.status(401).json({ errors: 'user unauthorized' });

        await this.service.users.deleteUserById(id);

        return res.status(200).json({ results: 'user deleted' });
    });
}

interface Login extends Request {
    body: {
        email: string;
        password: string;
    };
}

interface Register extends Request {
    body: {
        username: string;
        email: string;
        password: string;
    };
}

interface PatchUsername extends Request {
    body: {
        id: string;
        username: string;
    };
}

interface PatchEmail extends Request {
    body: {
        id: string;
        email: string;
    };
}

interface patchPassword extends Request {
    body: {
        id: string;
        oldPassword: string;
        newPassword: string;
    };
}
