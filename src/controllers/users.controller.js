import { compareHash } from '#lib/bcrypt.js';
import { signAsync } from '#lib/jwt.js';
import { userService } from '#services/repository.service.js';

export class UserController {
    postRegister = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;

            const existUser = await userService.getUserByEmail(email);
            if (existUser)
                return res.status(409).json({ errors: 'user conflict' });

            await userService.registerUser({ username, email, password });

            return res.status(201).json({ results: 'user created' });
        } catch (error) {
            next(error);
        }
    };

    postLogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const existUser = await userService.getUserByEmail(email);
            if (!existUser)
                return res.status(401).json({ errors: 'user unauthorized' });

            const equalPassword = await compareHash(password, existUser);
            if (!equalPassword)
                return res.status(401).json({ errors: 'user unauthorized' });

            const payload = { id: existUser._id };
            const token = await signAsync(payload);

            return res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req, res, next) => {
        try {
            const { id } = req;
            const { password } = req.body;

            const existUser = await userService.getUserByEmail(email);
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
