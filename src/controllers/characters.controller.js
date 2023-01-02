import { characterService } from '#services/repository.service.js';

class CharacterController {
    constructor(name) {
        this.name = name;
    }

    getCharacter = async (req, res, next) => {
        try {
            const results = await characterService.getAllCharacters();
            return res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };

    postCharacter = async (req, res, next) => {
        try {
            const results = await characterService.createCharacter(req.body);
            return res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };
}

export const characterCtrl = new CharacterController();
