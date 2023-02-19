import { compareHash, createHash } from '@lib/bcrypt';
import { signAsync } from '@lib/jwt';
import { RepositoryService } from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { ReqAuth } from '@utils/user-auth';
import { Request, Response } from 'express';

export class UserController extends HandlerError {
    private try = this.handlerError;

    constructor(readonly service: RepositoryService) {
        super();
    }

    public login = this.try(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await this.service.users.getUserBy({ email });

        if (!user) return res.status(401).json({ errors: 'user unauthorized' });

        const equalPassword = await compareHash(password, user);
        if (!equalPassword)
            return res.status(401).json({ errors: 'user unauthorized' });

        const payload = { id: user._id };

        const token = signAsync(payload);

        return res.status(200).json({ token });
    });

    public register = this.try(async (req: Request, res: Response) => {
        const { username, email, password } = req.body;

        const existUser = await this.service.users.getUserBy({ email });

        if (existUser) return res.status(409).json({ errors: 'user conflict' });

        const passwordHashed = await createHash(password);

        const user = { username, email, password: passwordHashed };

        await this.service.users.registerUser(user);

        return res.status(201).json({ results: 'user created' });
    });

    public patchUsername = this.try(async (req: ReqAuth, res: Response) => {
        const { id } = req;
        const { username } = req.body;

        const user = await this.service.users.getUserById(id);

        if (!user) return res.status(404).json({ errors: 'user not found' });

        user.username = username;

        await this.service.users.updateUserById(id, user);

        return res.status(200).json({ results: 'user updated' });
    });

    public patchEmail = this.try(async (req: ReqAuth, res: Response) => {
        const { id } = req;
        const { email } = req.body;

        const user = await this.service.users.getUserById(id);

        if (!user) return res.status(404).json({ errors: 'user not found' });

        user.email = email;

        await this.service.users.updateUserById(id, user);

        return res.status(200).json({ results: 'user updated' });
    });

    public patchPassword = this.try(async (req: ReqAuth, res: Response) => {
        const { id } = req;
        const { oldPassword, newPassword } = req.body;

        const user = await this.service.users.getUserById(id);

        if (!user) return res.status(404).json({ errors: 'user not found' });

        const checkPassword = await compareHash(oldPassword, user);
        if (!checkPassword)
            return res.status(401).json({ errors: 'unauthorized' });

        user.password = await createHash(newPassword);
        await this.service.users.updateUserById(id, user);

        return res.status(200).json({ results: 'user updated' });
    });

    public deleteUser = this.try(async (req: ReqAuth, res: Response) => {
        const { id } = req;
        const { password } = req.body;

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

// const patchUsername = async (req: ReqAuth, res: Response) => {
//     const { id } = req;
//     const { username } = req.body;

//     const user = await UserService.getUserById(id);
//     if (!user) return res.status(404).json({ errors: 'user not found' });

//     user.username = username;

//     await UserService.updateUserById(id, user);

//     return res.status(200).json({ results: 'user updated' });
// }

// const patchEmail = async (req: ReqAuth, res: Response) => {
//     const { id } = req;
//     const { email } = req.body;

//     const user = await UserService.getUserById(id);
//     if (!user) return res.status(404).json({ errors: 'user not found' });

//     user.email = email;

//     await UserService.updateUserById(id, user);

//     return res.status(200).json({ results: 'user updated' });
// }

// const patchPassword = async (req: ReqAuth, res: Response) => {
//     const { id } = req;
//     const { oldPassword, newPassword } = req.body;

//     const user = await UserService.getUserById(id);
//     if (!user) return res.status(404).json({ errors: 'user not found' });

//     const checkPassword = await compareHash(oldPassword, user);
//     if (!checkPassword) return res.status(401).json({ errors: 'unauthorized' });

//     user.password = await createHash(newPassword);
//     await UserService.updateUserById(id, user);

//     return res.status(200).json({ results: 'user updated' });
// }

// const deleteUser = async (req: ReqAuth, res: Response) => {
//     const { id } = req;
//     const { password } = req.body;

//     const existUser = await UserService.getUserById(id);
//     if (!existUser)
//         return res.status(401).json({ errors: 'user unauthorized' });

//     const equalPassword = await compareHash(password, existUser);
//     if (!equalPassword)
//         return res.status(401).json({ errors: 'user unauthorized' });

//     await UserService.deleteUserById(id);

//     return res.status(200).json({ results: 'user deleted' });
// }
