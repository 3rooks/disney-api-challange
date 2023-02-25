import { ORDER } from '@constants/order';
import { movieProjection } from '@interfaces/projections/movie.projection';
import { RepositoryService } from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class MovieController extends HandlerError {
    private try = this.handlerError;

    constructor(readonly service: RepositoryService) {
        super();
    }

    public getMovies = this.try(async (req: GetMovies, res: Response) => {
        const { title, gender, order } = req.query;
        if (!title && !gender && !order) {
            return res.status(200).json({
                results: await this.service.movies.getAllMovies(movieProjection)
            });
        } else if (title && !gender && !order) {
            const results = await this.service.movies.getMovieBy({ title });
            if (!results) return notFound(res, 'movie not found');
            return res.status(200).json({ results });
        } else if (gender && !title && !order) {
            const results = await this.service.genders.getGenderById(gender);
            if (!results) return notFound(res, 'gender not found');
            return res.status(200).json({ results: results.movies });
        } else if (order && !title && !gender) {
            if (order === Object.keys(ORDER)[0]) {
                return res.status(200).json({
                    results: await this.service.movies.getMoviesSorted(
                        ORDER.ASC,
                        movieProjection
                    )
                });
            } else if (order === Object.keys(ORDER)[1]) {
                return res.status(200).json({
                    results: await this.service.movies.getMoviesSorted(
                        ORDER.DESC,
                        movieProjection
                    )
                });
            } else return badRequest(res, 'ASC|DESC');
        } else return badRequest(res, 'TITLE|ORGER|GENDER');
    });

    public getMovieById = this.try(async (req: GetByIdMovie, res: Response) => {
        const { idMovie } = req.params;
        const results = await this.service.movies.getMovieById(idMovie);
        if (!results) return notFound(res, 'movie not found');
        return res.status(200).json({ results });
    });

    public postMovie = this.try(async (req: PostMovie, res: Response) => {
        const { title } = req.body;
        const existMovie = await this.service.movies.getMovieBy({ title });
        if (existMovie) return conflict(res, 'movie conflict');
        await this.service.movies.createMovie(req.body);
        return res.status(201).json({ results: 'movie created' });
    });

    public postCharacter = this.try(
        async (req: PostCharacter, res: Response) => {
            const { idMovie } = req.params;
            const { character } = req.body;

            const existMovie = await this.service.movies.getMovieById(idMovie);
            if (!existMovie) return notFound(res, 'movie not found');

            const existCharacter =
                await this.service.characters.getCharacterById(character);
            if (!existCharacter) return notFound(res, 'character not found');

            const existCharInMovie = existMovie.characters?.find(
                (e: any) => e.character._id === character
            );
            if (existCharInMovie) return conflict(res, 'character conflict');
            existMovie.characters?.push({ character });
            await this.service.movies.updateMovieById(idMovie, existMovie);
            return res.status(200).json({ results: 'movie updated' });
        }
    );

    public deleteCharacter = this.try(
        async (req: DeleteCharacter, res: Response) => {
            const { idMovie, idCharacter } = req.params;

            const existMovie = await this.service.movies.getMovieById(idMovie);
            if (!existMovie) return notFound(res, 'movie not found');

            const existCharacter = existMovie.characters?.find(
                (e: any) => e.character._id === idCharacter
            );
            if (!existCharacter) return notFound(res, 'character not found');

            if (existMovie.characters) {
                const characterIndex = existMovie.characters.findIndex(
                    (e: any) => e.character._id === idCharacter
                );
                existMovie.characters.splice(characterIndex, 1);
            }
            await this.service.movies.updateMovieById(idMovie, existMovie);
            return res.status(200).json({ results: 'character deleted' });
        }
    );

    public putMovie = this.try(async (req: PutMovie, res: Response) => {
        const { idMovie } = req.params;
        const { title } = req.body;

        const existMovie = await this.service.movies.getMovieById(idMovie);
        if (!existMovie) return notFound(res, 'movie not found');

        const existMovieTitle = await this.service.movies.getMovieBy({ title });
        if (existMovieTitle) return conflict(res, 'movie conflict');

        await this.service.movies.updateMovieById(idMovie, { ...req.body });
        return res.status(200).json({ results: 'movie updated' });
    });

    public deleteMovie = this.try(async (req: DeleteMovie, res: Response) => {
        const { idMovie } = req.params;

        const existMovie = await this.service.movies.getMovieById(idMovie);

        if (!existMovie) return notFound(res, 'movie not found');

        await this.service.movies.deleteMovieById(idMovie);

        return res.status(200).json({ results: 'movie deleted' });
    });
}

const conflict = (res: Response, msg: string) =>
    res.status(409).json({ errors: msg });

const notFound = (res: Response, msg: string) =>
    res.status(404).json({ errors: msg });

const badRequest = (res: Response, msg: string) =>
    res.status(400).json({ errors: msg });

interface GetMovies extends Request {
    query: {
        title?: string;
        gender?: string;
        order?: string;
    };
}

interface GetByIdMovie extends Request {
    params: {
        idMovie: string;
    };
}

interface PostMovie extends Request {
    body: {
        title: string;
        image: string;
        rated: number;
        releaseYear: number;
    };
}

interface PostCharacter extends Request {
    params: {
        idMovie: string;
    };

    body: {
        character: string;
    };
}

interface PutMovie extends Request {
    params: {
        idMovie: string;
    };

    body: {
        title: string;
        image: string;
        rated: number;
        releaseYear: number;
    };
}

interface DeleteCharacter extends Request {
    params: {
        idMovie: string;
        idCharacter: string;
    };
}

interface DeleteMovie extends GetByIdMovie {}
