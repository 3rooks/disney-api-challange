import { genderService } from '#services/repository.service.js';

class GenderController {
    getGender = async (req, res, next) => {
        try {
            const results = await genderService.getAllGenders();
            res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };

    postGender = async (req, res, next) => {
        try {
            const results = await genderService.createGender(req.body);
            return res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };
}

export const genderCtrl = new GenderController();
