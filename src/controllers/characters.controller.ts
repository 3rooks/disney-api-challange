import { CharacterService, MovieService } from '@services/repository.service';
import { NextFunction, Request, Response } from 'express';

export class CharacterController {
    getCharacter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (Object.keys(req.query).length === 0) {
                const results = await CharacterService.getAllCharacters();
                return res.status(200).json({ results });
            }

            const { name, age: ageString, movie } = req.query;

            if (name && !ageString && !movie) {
                const results = await CharacterService.getCharacterBy({ name });
                if (!results)
                    return res
                        .status(404)
                        .json({ errors: 'character not found' });
                return res.status(200).json({ results });
            } else if (ageString && !name && !movie) {
                const age = Number(ageString);
                const results = await CharacterService.getAllCharacterBy({
                    age
                });
                if (!results)
                    return res
                        .status(404)
                        .json({ errors: 'character not found' });
                return res.status(200).json({ results });
            } else if (movie && !name && !ageString) {
                const results = await MovieService.getMovieById(
                    movie.toString()
                );
                if (!results)
                    return res.status(404).json({ errors: 'movie not found' });
                return res.status(200).json({ results: results.characters });
            } else return res.status(400).json({ errors: 'bad request' });
        } catch (error) {
            return next(error);
        }
    };

    getCharacterById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { idCharacter } = req.params;

            const results = await CharacterService.getCharacterById(
                idCharacter
            );
            if (!results)
                return res.status(404).json({ errors: 'character not found' });

            return res.status(200).json({ results });
        } catch (error) {
            return next(error);
        }
    };

    postCharacter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, image, age, history } = req.body;

            const existCharacter = await CharacterService.getCharacterBy({
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
            await CharacterService.createCharacter(character);

            return res.status(200).json({ results: 'character created' });
        } catch (error) {
            return next(error);
        }
    };

    putCharacter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idCharacter } = req.params;
            const { name, image, age, history } = req.body;

            const character = await CharacterService.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ errors: 'character not found' });

            const existCharacter = await CharacterService.getCharacterBy({
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

            await CharacterService.updateCharacterById(
                idCharacter,
                updatedCharacter
            );

            return res.status(200).json({ results: 'character updated' });
        } catch (error) {
            return next(error);
        }
    };

    deleteCharacter = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { idCharacter } = req.params;

            const character = await CharacterService.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ errors: 'character not found' });

            await CharacterService.deleteCharacterById(idCharacter);

            return res.status(200).json({ results: 'character deleted' });
        } catch (error) {
            return next(error);
        }
    };

    postMovie = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idCharacter } = req.params;
            const { movie } = req.body;

            const character = await CharacterService.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ errors: 'character not found' });

            const existMovie = await MovieService.getMovieById(movie);
            if (!existMovie)
                return res.status(404).json({ results: 'movie not found' });

            const existMovieInCharacter = character.movies.find(
                (e: any) => e.movie === movie
            );
            if (existMovieInCharacter)
                return res.status(409).json({ errors: 'movie conflict' });

            character.movies.push({ movie });
            await CharacterService.updateCharacterById(idCharacter, character);

            return res.status(200).json({ results: 'character updated' });
        } catch (error) {
            return next(error);
        }
    };

    deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idCharacter, idMovie } = req.params;

            const character = await CharacterService.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ results: 'character not found' });

            const existMovie = await character.movies.find(
                (e: any) => e.movie === idMovie
            );
            if (!existMovie)
                return res.status(404).json({ results: 'movie not found' });

            const movieIndex = await character.movies.findIndex(
                (e: any) => e.movie === idMovie
            );
            character.movies.splice(movieIndex, 1);

            await CharacterService.updateCharacterById(idCharacter, character);

            return res.status(200).json({ results: 'movie deleted' });
        } catch (error) {
            return next(error);
        }
    };
}
