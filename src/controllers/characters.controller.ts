import { ICharacter } from '@interfaces/character.interface';
import { CharacterService, MovieService } from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class CharacterController extends HandlerError {
    private try = this.handlerError;

    public getCharacterById = this.try(getCharacterById);

    public getCharacter = this.try(getCharacter);

    public postCharacter = this.try(postCharacter);

    public postMovie = this.try(postMovie);

    public putCharacter = this.try(putCharacter);

    public deleteCharacter = this.try(deleteCharacter);

    public deleteMovie = this.try(deleteMovie);
}

const getCharacter = async (req: Request, res: Response) => {
    if (Object.keys(req.query).length === 0) {
        const exclude = {
            age: 0,
            history: 0,
            movies: 0,
            createdAt: 0,
            updatedAt: 0
        };

        const results = await CharacterService.getAllCharacters(exclude);
        return res.status(200).json({ results });
    }

    const { name, age: ageString, movie } = req.query;

    if (name && !ageString && !movie) {
        const results = await CharacterService.getCharacterBy({ name });
        if (!results)
            return res.status(404).json({ errors: 'character not found' });
        return res.status(200).json({ results });
    } else if (ageString && !name && !movie) {
        const age = Number(ageString);
        const results = await CharacterService.getAllCharacterBy({
            age
        });
        if (!results)
            return res.status(404).json({ errors: 'character not found' });
        return res.status(200).json({ results });
    } else if (movie && !name && !ageString) {
        /**
         * retorna los personajes de una pelicula
         */
        const results = await MovieService.getMovieById(movie.toString());
        if (!results)
            return res.status(404).json({ errors: 'movie not found' });
        return res.status(200).json({ results: results.characters });
    } else return res.status(400).json({ errors: 'bad request' });
};

const getCharacterById = async (req: Request, res: Response) => {
    const { idCharacter } = req.params;

    const results = await CharacterService.getCharacterById(idCharacter);
    if (!results)
        return res.status(404).json({ errors: 'character not found' });

    return res.status(200).json({ results });
};

const postCharacter = async (req: Request, res: Response) => {
    const { name, image, age, history } = req.body;

    const existCharacter = await CharacterService.getCharacterBy({
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
    await CharacterService.createCharacter(character);

    return res.status(200).json({ results: 'character created' });
};

const putCharacter = async (req: Request, res: Response) => {
    const { idCharacter } = req.params;
    const { name, image, age, history } = req.body;

    const character = await CharacterService.getCharacterById(idCharacter);
    if (!character)
        return res.status(404).json({ errors: 'character not found' });

    const existCharacter = await CharacterService.getCharacterBy({
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

    await CharacterService.updateCharacterById(idCharacter, updatedCharacter);

    return res.status(200).json({ results: 'character updated' });
};

const deleteCharacter = async (req: Request, res: Response) => {
    const { idCharacter } = req.params;

    const character = await CharacterService.getCharacterById(idCharacter);
    if (!character)
        return res.status(404).json({ errors: 'character not found' });

    await CharacterService.deleteCharacterById(idCharacter);

    return res.status(200).json({ results: 'character deleted' });
};

const postMovie = async (req: Request, res: Response) => {
    const { idCharacter } = req.params;
    const { movie } = req.body;

    const character = await CharacterService.getCharacterById(idCharacter);
    if (!character)
        return res.status(404).json({ errors: 'character not found' });

    const existMovie = await MovieService.getMovieById(movie);
    if (!existMovie)
        return res.status(404).json({ results: 'movie not found' });

    if (character.movies) {
        const existMovieInCharacter = character.movies.find(
            (e: any) => e.movie === movie
        );
        if (existMovieInCharacter)
            return res.status(409).json({ errors: 'movie conflict' });

        character.movies.push({ movie });
        await CharacterService.updateCharacterById(idCharacter, character);
    }
    return res.status(200).json({ results: 'character updated' });
};

const deleteMovie = async (req: Request, res: Response) => {
    const { idCharacter, idMovie } = req.params;

    const character = await CharacterService.getCharacterById(idCharacter);
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

        await CharacterService.updateCharacterById(idCharacter, character);
    }

    return res.status(200).json({ results: 'movie deleted' });
};
