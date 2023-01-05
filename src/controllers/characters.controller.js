import {
    characterService,
    movieService
} from '#services/repository.service.js';

export class CharacterController {
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

    postMovie = async (req, res, next) => {
        try {
            const { idCharacter } = req.params;
            const { movie } = req.body;

            const character = await characterService.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ errors: 'character not found' });

            const existMovie = await movieService.getMovieById(movie);
            if (!existMovie)
                return res.status(404).json({ results: 'movie not found' });

            character.movies.push({ movie });
            await characterService.updateCharacterById(idCharacter, character);

            return res.status(200).json({ results: 'character updated' });
        } catch (error) {
            next(error);
        }
    };

    deleteCharacter = async (req, res, next) => {
        try {
            const { idCharacter } = req.params;

            const character = await characterService.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ errors: 'character not found' });

            await characterService.deleteCharacterById(idCharacter);

            return res.status(200).json({ results: 'character deleted' });
        } catch (error) {
            next(error);
        }
    };
}
