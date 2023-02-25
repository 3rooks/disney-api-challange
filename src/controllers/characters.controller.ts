import { characterProjection } from '@interfaces/projections/character.projection';
import { RepositoryService } from '@services/repository.service';

import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class CharacterController extends HandlerError {
    private try = this.handlerError;

    constructor(readonly service: RepositoryService) {
        super();
    }

    public getCharacters = this.try(
        async (req: GetCharacters, res: Response) => {
            const { name, movie, age } = req.body;
            if (!name && !movie && !age) {
                return res.status(200).json({
                    results: await this.service.characters.getAllCharacters(
                        characterProjection
                    )
                });
            } else if (name && !movie && !age) {
                const results = await this.service.characters.getAllCharacterBy(
                    {
                        name
                    }
                );
                if (results?.length === 0)
                    return res
                        .status(404)
                        .json({ errors: 'character not found' });
                return res.status(200).json({ results });
            } else if (age && !name && !movie) {
                const results = await this.service.characters.getAllCharacterBy(
                    {
                        age
                    }
                );
                if (results?.length === 0)
                    return res
                        .status(404)
                        .json({ errors: 'character not found' });
                return res.status(200).json({ results });
            } else if (movie && !name && !age) {
                const results = await this.service.movies.getMovieById(movie);
                if (!results)
                    return res.status(404).json({ errors: 'movie not found' });
                return res.status(200).json({ results: results.characters });
            } else return res.status(400).json({ errors: 'bad request' });
        }
    );

    public getCharacterById = this.try(
        async (req: GetCharacterById, res: Response) => {
            const { idCharacter } = req.params;

            const results = await this.service.characters.getCharacterById(
                idCharacter
            );
            if (!results)
                return res.status(404).json({ errors: 'character not found' });

            return res.status(200).json({ results });
        }
    );

    public postCharacter = this.try(
        async (req: PostCharacter, res: Response) => {
            const { name } = req.body;

            const existCharacter = await this.service.characters.getCharacterBy(
                {
                    name
                }
            );
            if (existCharacter)
                return res.status(409).json({ errors: 'character conflict' });

            await this.service.characters.createCharacter(req.body);
            return res.status(200).json({ results: 'character created' });
        }
    );

    public postMovie = this.try(async (req: PostMovie, res: Response) => {
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

        const existMovieInCharacter = character.movies?.find(
            (e: any) => e.movie._id === movie
        );
        if (existMovieInCharacter)
            return res.status(409).json({ errors: 'movie conflict' });

        character.movies?.push({ movie });
        await this.service.characters.updateCharacterById(
            idCharacter,
            character
        );
        return res.status(200).json({ results: 'character updated' });
    });

    public putCharacter = this.try(async (req: PutCharacter, res: Response) => {
        const { idCharacter } = req.params;
        const { name } = req.body;

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

        await this.service.characters.updateCharacterById(idCharacter, {
            ...req.body
        });
        return res.status(200).json({ results: 'character updated' });
    });

    public deleteCharacter = this.try(
        async (req: DeleteCharacter, res: Response) => {
            const { idCharacter } = req.params;

            const character = await this.service.characters.getCharacterById(
                idCharacter
            );
            if (!character)
                return res.status(404).json({ errors: 'character not found' });

            await this.service.characters.deleteCharacterById(idCharacter);
            return res.status(200).json({ results: 'character deleted' });
        }
    );

    public deleteMovie = this.try(async (req: DeleteMovie, res: Response) => {
        const { idCharacter, idMovie } = req.params;

        const character = await this.service.characters.getCharacterById(
            idCharacter
        );
        if (!character)
            return res.status(404).json({ results: 'character not found' });

        const existMovie = character.movies?.find(
            (e: any) => e.movie === idMovie
        );
        if (!existMovie)
            return res.status(404).json({ results: 'movie not found' });

        if (character.movies) {
            const movieIndex = character.movies?.findIndex(
                (e: any) => e.movie === idMovie
            );
            character.movies?.splice(movieIndex, 1);
        }

        await this.service.characters.updateCharacterById(
            idCharacter,
            character
        );
        return res.status(200).json({ results: 'movie deleted' });
    });
}

interface GetCharacters extends Request {
    body: {
        name?: string;
        movie?: string;
        age?: number;
    };
}

interface GetCharacterById extends Request {
    params: {
        idCharacter: string;
    };
}

interface PostCharacter extends Request {
    body: {
        name: string;
        image: string;
        age: number;
        history: string;
    };
}

interface PostMovie extends Request {
    params: {
        idCharacter: string;
    };

    body: {
        movie: string;
    };
}

interface PutCharacter extends Request {
    params: { idCharacter: string };

    body: { name: string; image: string; age: number; history: string };
}

interface DeleteMovie extends Request {
    params: {
        idCharacter: string;
        idMovie: string;
    };
}

interface DeleteCharacter extends GetCharacterById {}
