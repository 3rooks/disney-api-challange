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

    getCharacterById = async (req, res, next) => {
        try {
            const { idCharacter } = req.params;

            const character = await characterService.getCharacterById(
                idCharacter
            );

            if (!character)
                return res
                    .status(404)
                    .status({ errors: 'character not found' });

            return res.status(200).json({ results: character });
        } catch (error) {
            next(error);
        }
    };

    postCharacter = async (req, res, next) => {
        try {
            const { name, image, age, history } = req.body;

            const character = {
                name,
                image,
                age,
                history
            };
            const results = await characterService.createCharacter(character);

            return res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };

    putCharacter = async (req, res, next) => {
        try {
            const { idCharacter } = req.params;
            const { name, image, age, history } = req.body;

            const character = await characterService.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ errors: 'character not found' });

            const updatedCharacter = {
                name,
                image,
                age,
                history
            };

            await characterService.updateCharacterById(
                idCharacter,
                updatedCharacter
            );

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

    deleteMovie = async (req, res, next) => {
        try {
            const { idCharacter, idMovie } = req.params;

            const character = await characterService.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ results: 'character not found' });

            const existMovie = await character.movies.find(
                (i) => i.movie === idMovie
            );
            if (!existMovie)
                return res.status(404).json({ results: 'movie not found' });

            const movieIndex = await character.movies.findIndex(
                (i) => i.movie === idMovie
            );
            character.movies.splice(movieIndex, 1);

            await characterService.updateCharacterById(idCharacter, character);

            return res.status(200).json({ results: 'movie deleted' });
        } catch (error) {
            next(error);
        }
    };
}
