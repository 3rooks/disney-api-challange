

export class CharacterController {
    getCharacter = async (req, res, next) => {
        try {
            if (Object.keys(req.query).length === 0) {
                const results = await characterService.getAllCharacters();
                return res.status(200).json({ results });
            }

            const { name, age: ageString, movie } = req.query;

            if (name && !ageString && !movie) {
                const results = await characterService.getCharacterBy({ name });
                if (!results)
                    return res
                        .status(404)
                        .json({ errors: 'character not found' });
                return res.status(200).json({ results });
            } else if (ageString && !name && !movie) {
                const age = Number(ageString);
                const results = await characterService.getAllCharacterBy({
                    age
                });
                if (!results)
                    return res
                        .status(404)
                        .json({ errors: 'character not found' });
                return res.status(200).json({ results });
            } else if (movie && !name && !ageString) {
                const results = await movieService.getMovieById(movie);
                if (!results)
                    return res.status(404).json({ errors: 'movie not found' });
                return res.status(200).json({ results: results.characters });
            } else return res.status(400).json({ errors: 'bad request' });
        } catch (error) {
            next(error);
        }
    };

    getCharacterById = async (req, res, next) => {
        try {
            const { idCharacter } = req.params;

            const results = await characterService.getCharacterById(
                idCharacter
            );
            if (!results)
                return res.status(404).json({ errors: 'character not found' });

            return res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };

    postCharacter = async (req, res, next) => {
        try {
            const { name, image, age, history } = req.body;

            const existCharacter = await characterService.getCharacterBy({
                name
            });
            if (existCharacter)
                return res.status(409).json({ errors: 'character conflict' });

            const character = {
                name,
                image,
                age,
                history
            };
            await characterService.createCharacter(character);

            return res.status(200).json({ results: 'character created' });
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

            const existCharacter = await characterService.getCharacterBy({
                name
            });
            if (existCharacter)
                return res.status(409).json({ errors: 'character conflict' });

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

            const existMovieInCharacter = character.movies.find(
                (e) => e.movie === movie
            );
            if (existMovieInCharacter)
                return res.status(409).json({ errors: 'movie conflict' });

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
                (e) => e.movie === idMovie
            );
            if (!existMovie)
                return res.status(404).json({ results: 'movie not found' });

            const movieIndex = await character.movies.findIndex(
                (e) => e.movie === idMovie
            );
            character.movies.splice(movieIndex, 1);

            await characterService.updateCharacterById(idCharacter, character);

            return res.status(200).json({ results: 'movie deleted' });
        } catch (error) {
            next(error);
        }
    };
}
