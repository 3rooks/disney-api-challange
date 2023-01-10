import { compareHash, createHash } from '#lib/bcrypt.js';
import { signAsync } from '#lib/jwt.js';
import { userService } from '#services/repository.service.js';

export class UserController {
    postRegister = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;

            const existUser = await userService.getUserBy({ email });
            if (existUser)
                return res.status(409).json({ errors: 'user conflict' });

            const passwordHashed = await createHash(password);

            const user = { username, email, password: passwordHashed };

            await userService.registerUser(user);

            return res.status(201).json({ results: 'user created' });
        } catch (error) {
            next(error);
        }
    };

    postLogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userService.getUserBy(email);
            if (!user)
                return res.status(401).json({ errors: 'user unauthorized' });

            const equalPassword = await compareHash(password, user);
            if (!equalPassword)
                return res.status(401).json({ errors: 'user unauthorized' });

            const payload = { id: user._id };
            const token = await signAsync(payload);

            return res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    };

    patchUsername = async (req, res, next) => {
        try {
            const { id } = req;
            const { username } = req.body;

            const user = await userService.getUserById(id);
            if (!user)
                return res.status(404).json({ errors: 'user not found' });

            user.username = username;

            await userService.updateUserById(id, user);

            return res.status(200).json({ results: 'user updated' });
        } catch (error) {
            next(error);
        }
    };

    patchEmail = async (req, res, next) => {
        try {
            const { id } = req;
            const { email } = req.body;

            const user = await userService.getUserById(id);
            if (!user)
                return res.status(404).json({ errors: 'user not found' });

            user.email = email;

            await userService.updateUserById(id, user);

            return res.status(200).json({ results: 'user updated' });
        } catch (error) {
            next(error);
        }
    };

    patchPassword = async (req, res, next) => {
        try {
            const { id } = req;
            const { oldPassword, newPassword } = req.body;

            const user = await userService.getUserById(id);
            if (!user)
                return res.status(404).json({ errors: 'user not found' });

            const checkPassword = await compareHash(oldPassword, user);
            if (!checkPassword)
                return res.status(401).json({ errors: 'unauthorized' });

            user.password = await createHash(newPassword);
            await userService.updateUserById(id, user);

            return res.status(200).json({ results: 'user updated' });
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req, res, next) => {
        try {
            const { id } = req;
            const { password } = req.body;

            const existUser = await userService.getUserBy(email);
            if (!existUser)
                return res.status(401).json({ errors: 'user unauthorized' });

            const equalPassword = await compareHash(password, existUser);
            if (!equalPassword)
                return res.status(401).json({ errors: 'user unauthorized' });

            await userService.deleteUserById(id);

            return res.status(200).json({ results: 'user deleted' });
        } catch (error) {
            next(error);
        }
    };
}
