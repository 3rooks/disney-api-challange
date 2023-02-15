import { compareHash, createHash } from '@lib/bcrypt';
import { UserService } from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { ReqAuth } from '@utils/user-auth';
import { Response } from 'express';

export class UserController extends HandlerError {
    private try = this.handlerError;

    public patchUsername = this.try(patchUsername);

    public patchEmail = this.try(patchEmail);

    public patchPassword = this.try(patchPassword);

    public deleteUser = this.try(deleteUser);
}

const patchUsername = async (req: ReqAuth, res: Response) => {
    const { id } = req;
    const { username } = req.body;

    const user = await UserService.getUserById(id);
    if (!user) return res.status(404).json({ errors: 'user not found' });

    user.username = username;

    await UserService.updateUserById(id, user);

    return res.status(200).json({ results: 'user updated' });
};

const patchEmail = async (req: ReqAuth, res: Response) => {
    const { id } = req;
    const { email } = req.body;

    const user = await UserService.getUserById(id);
    if (!user) return res.status(404).json({ errors: 'user not found' });

    user.email = email;

    await UserService.updateUserById(id, user);

    return res.status(200).json({ results: 'user updated' });
};

const patchPassword = async (req: ReqAuth, res: Response) => {
    const { id } = req;
    const { oldPassword, newPassword } = req.body;

    const user = await UserService.getUserById(id);
    if (!user) return res.status(404).json({ errors: 'user not found' });

    const checkPassword = await compareHash(oldPassword, user);
    if (!checkPassword) return res.status(401).json({ errors: 'unauthorized' });

    user.password = await createHash(newPassword);
    await UserService.updateUserById(id, user);

    return res.status(200).json({ results: 'user updated' });
};

const deleteUser = async (req: ReqAuth, res: Response) => {
    const { id } = req;
    const { password } = req.body;

    const existUser = await UserService.getUserById(id);
    if (!existUser)
        return res.status(401).json({ errors: 'user unauthorized' });

    const equalPassword = await compareHash(password, existUser);
    if (!equalPassword)
        return res.status(401).json({ errors: 'user unauthorized' });

    await UserService.deleteUserById(id);

    return res.status(200).json({ results: 'user deleted' });
};
