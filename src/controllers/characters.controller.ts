import { ICharacter } from '@interfaces/character.interface';
import { characterProjection } from '@interfaces/projections/character.projection';
import { RepositoryService } from '@services/repository.service';

import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class CharacterController extends HandlerError {
    private try = this.handlerError;

    constructor(readonly service: RepositoryService) {
        super();
    }

    public getCharacters = this.try(async (req: Request, res: Response) => {
        if (Object.keys(req.query).length === 0) {
            const results = await this.service.characters.getAllCharacters(
                characterProjection
            );
            return res.status(200).json({ results });
        }

        const { name, age: ageString, movie } = req.query;

        if (name && !ageString && !movie) {
            const results = await this.service.characters.getAllCharacterBy({
                name
            });
            if (!results)
                return res.status(404).json({ errors: 'character not found' });
            return res.status(200).json({ results });
        } else if (ageString && !name && !movie) {
            const age = Number(ageString);
            const results = await this.service.characters.getAllCharacterBy({
                age
            });
            if (!results)
                return res.status(404).json({ errors: 'character not found' });
            return res.status(200).json({ results });
        } else if (movie && !name && !ageString) {
            const results = await this.service.movies.getMovieById(
                movie.toString()
            );
            if (!results)
                return res.status(404).json({ errors: 'movie not found' });
            return res.status(200).json({ results: results.characters });
        } else return res.status(400).json({ errors: 'bad request' });
    });

    public getCharacterById = this.try(async (req: Request, res: Response) => {
        const { idCharacter } = req.params;

        const results = await this.service.characters.getCharacterById(
            idCharacter
        );
        if (!results)
            return res.status(404).json({ errors: 'character not found' });

        return res.status(200).json({ results });
    });

    public postCharacter = this.try(async (req: Request, res: Response) => {
        const { name, image, age, history } = req.body;

        const existCharacter = await this.service.characters.getCharacterBy({
            name
        });

        if (existCharacter)
            return res.status(409).json({ errors: 'character conflict' });

        const character: ICharacter = {
            name,
            image,
            age,
            history
        };
        await this.service.characters.createCharacter(character);

        return res.status(200).json({ results: 'character created' });
    });

    public postMovie = this.try(async (req: Request, res: Response) => {
        const { idCharacter } = req.params;
        const { movie } = req.body;

        const character = await this.service.characters.getCharacterById(
            idCharacter
        );

        if (!character)
            return res.status(404).json({ errors: 'character not found' });

        const existMovie = await this.service.movies.getMovieById(movie);

        if (!existMovie)
            return res.status(404).json({ results: 'movie not found' });

        if (character.movies) {
            const existMovieInCharacter = character.movies.find(
                (e: any) => e.movie === movie
            );
            if (existMovieInCharacter)
                return res.status(409).json({ errors: 'movie conflict' });

            character.movies.push({ movie });
            await this.service.characters.updateCharacterById(
                idCharacter,
                character
            );
        }
        return res.status(200).json({ results: 'character updated' });
    });

    public putCharacter = this.try(async (req: Request, res: Response) => {
        const { idCharacter } = req.params;
        const { name, image, age, history } = req.body;

        const character = await this.service.characters.getCharacterById(
            idCharacter
        );

        if (!character)
            return res.status(404).json({ errors: 'character not found' });

        const existCharacter = await this.service.characters.getCharacterBy({
            name
        });

        if (existCharacter)
            return res.status(409).json({ errors: 'character conflict' });

        const updatedCharacter = {
            ...character,
            name,
            image,
            age,
            history
        };

        await this.service.characters.updateCharacterById(
            idCharacter,
            updatedCharacter
        );

        return res.status(200).json({ results: 'character updated' });
    });

    public deleteCharacter = this.try(async (req: Request, res: Response) => {
        const { idCharacter } = req.params;

        const character = await this.service.characters.getCharacterById(
            idCharacter
        );

        if (!character)
            return res.status(404).json({ errors: 'character not found' });

        await this.service.characters.deleteCharacterById(idCharacter);

        return res.status(200).json({ results: 'character deleted' });
    });

    public deleteMovie = this.try(async (req: Request, res: Response) => {
        const { idCharacter, idMovie } = req.params;

        const character = await this.service.characters.getCharacterById(
            idCharacter
        );

        if (!character)
            return res.status(404).json({ results: 'character not found' });

        if (character.movies) {
            const existMovie = await character.movies.find(
                (e: any) => e.movie === idMovie
            );
            if (!existMovie)
                return res.status(404).json({ results: 'movie not found' });

            const movieIndex = await character.movies.findIndex(
                (e: any) => e.movie === idMovie
            );
            character.movies.splice(movieIndex, 1);

            await this.service.characters.updateCharacterById(
                idCharacter,
                character
            );
        }

        return res.status(200).json({ results: 'movie deleted' });
    });
}
