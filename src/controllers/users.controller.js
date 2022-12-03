import { userService } from '#services/repository.service.js';

export const registerUser = async (req, res) => {
    const result = await userService.registerUser();
    res.status(200).json({ result });
};
