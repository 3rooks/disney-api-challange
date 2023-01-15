import { compareHash, createHash } from '@lib/bcrypt';
import { signAsync } from '@lib/jwt';
import { UserService } from '@services/repository.service';
import { ReqAuth } from '@utils/user-auth';
import { NextFunction, Request, Response } from 'express';

export class UserController {
    postRegister = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, email, password } = req.body;

            const existUser = await UserService.getUserBy({ email });
            if (existUser)
                return res.status(409).json({ errors: 'user conflict' });

            const passwordHashed = await createHash(password);

            const user = { username, email, password: passwordHashed };

            await UserService.registerUser(user);

            return res.status(201).json({ results: 'user created' });
        } catch (error) {
            return next(error);
        }
    };

    postLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const user = await UserService.getUserBy(email);
            if (!user)
                return res.status(401).json({ errors: 'user unauthorized' });

            const equalPassword = await compareHash(password, user);
            if (!equalPassword)
                return res.status(401).json({ errors: 'user unauthorized' });

            // const payload = { id: user._id };

            const token = signAsync(user._id);

            return res.status(200).json({ token });
        } catch (error) {
            return next(error);
        }
    };

    patchUsername = async () => {
        return async (req: ReqAuth, res: Response, next: NextFunction) => {
            try {
                const { id } = req;
                const { username } = req.body;

                const user = await UserService.getUserById(id);
                if (!user)
                    return res.status(404).json({ errors: 'user not found' });

                user.username = username;

                await UserService.updateUserById(id, user);

                return res.status(200).json({ results: 'user updated' });
            } catch (error) {
                return next(error);
            }
        };
    };

    patchEmail = async () => {
        return async (req: ReqAuth, res: Response, next: NextFunction) => {
            try {
                const { id } = req;
                const { email } = req.body;

                const user = await UserService.getUserById(id);
                if (!user)
                    return res.status(404).json({ errors: 'user not found' });

                user.email = email;

                await UserService.updateUserById(id, user);

                return res.status(200).json({ results: 'user updated' });
            } catch (error) {
                return next(error);
            }
        };
    };

    patchPassword = async () => {
        return async (req: ReqAuth, res: Response, next: NextFunction) => {
            try {
                const { id } = req;
                const { oldPassword, newPassword } = req.body;

                const user = await UserService.getUserById(id);
                if (!user)
                    return res.status(404).json({ errors: 'user not found' });

                const checkPassword = await compareHash(oldPassword, user);
                if (!checkPassword)
                    return res.status(401).json({ errors: 'unauthorized' });

                user.password = await createHash(newPassword);
                await UserService.updateUserById(id, user);

                return res.status(200).json({ results: 'user updated' });
            } catch (error) {
                return next(error);
            }
        };
    };

    deleteUser = async () => {
        return async (req: ReqAuth, res: Response, next: NextFunction) => {
            try {
                const { id } = req;
                const { password } = req.body;

                const existUser = await UserService.getUserById(id);
                if (!existUser)
                    return res
                        .status(401)
                        .json({ errors: 'user unauthorized' });

                const equalPassword = await compareHash(password, existUser);
                if (!equalPassword)
                    return res
                        .status(401)
                        .json({ errors: 'user unauthorized' });

                await UserService.deleteUserById(id);

                return res.status(200).json({ results: 'user deleted' });
            } catch (error) {
                return next(error);
            }
        };
    };
}
