import { compareHash } from '#lib/bcrypt.js';
import { signAsync } from '#lib/jwt.js';
import { userService } from '#services/repository.service.js';

export const userRegisterCtrl = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existUser = await userService.getUserByEmail(email);
        if (!existUser) return res.status(409).json({ errors: 'conflict' });

        await userService.registerUser({ username, email, password });

        return res.status(201).json({ results: 'created' });
    } catch (error) {
        next(error);
    }
};

export const userLoginCtrl = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existUser = await userService.getUserByEmail(email);
        if (!existUser) return res.status(401).json({ errors: 'unauthorized' });

        const equalPassword = await compareHash(password, existUser);
        if (!equalPassword)
            return res.status(401).json({ errors: 'unauthorized' });

        const payload = { id: existUser._id };
        const token = await signAsync(payload);

        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

export const userUnregisterCtrl = async (req, res, next) => {
    try {
        const { id } = req;
        const { password } = req.body;

        const existUser = await userService.getUserByEmail(email);
        if (!existUser) return res.status(401).json({ errors: 'unauthorized' });

        const equalPassword = await compareHash(password, existUser);
        if (!equalPassword)
            return res.status(401).json({ errors: 'unauthorized' });

        await userService.deleteUserById(id);

        return res.status(204);
    } catch (error) {
        next(error);
    }
};
