import { ORDERS } from '@constants/order';
import {
    CharacterService,
    GenderService,
    MovieService
} from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class MovieController extends HandlerError {
    private try = this.handlerError;

    public getMovies = this.try(getMovies);

    public getMovieById = this.try(getMovieById);

    public postMovie = this.try(postMovie);

    public postCharacter = this.try(postCharacter);

    public deleteCharacter = this.try(deleteCharacter);

    public putMovie = this.try(putMovie);

    public deleteMovie = this.try(deleteMovie);
}

const getMovies = async (req: Request, res: Response) => {
    if (Object.keys(req.query).length === 0) {
        const results = await MovieService.getAllMovies();
        return res.status(200).json({ results });
    }

    const { title, gender, order } = req.query;

    // todo
    if (title && !gender && !order) {
        const results = await MovieService.getMovieBy({ title });
        if (!results)
            return res.status(404).json({ errors: 'movie not found' });
        return res.status(200).json({ results });
    } else if (gender && !title && !order) {
        const results = await GenderService.getGenderById(gender.toString());
        if (!results)
            return res.status(404).json({ errors: 'gender not found' });
        return res.status(200).json({ results: results.movies });
    } else if (order && !title && !gender) {
        if (order === Object.keys(ORDERS)[0]) {
            const results = await MovieService.getMoviesSorted({
                releaseYear: ORDERS.ASC
            });
            return res.status(200).json({ results });
        } else if (order === Object.keys(ORDERS)[1]) {
            const results = await MovieService.getMoviesSorted({
                releaseYear: ORDERS.DESC
            });
            return res.status(200).json({ results });
        } else return res.status(400).json({ errors: 'bad request' });
    } else return res.status(400).json({ errors: 'bad request' });
};

const getMovieById = async (req: Request, res: Response) => {
    const { idMovie } = req.params;

    const results = await MovieService.getMovieById(idMovie);
    if (!results) return res.status(404).json({ errors: 'movie not found' });

    return res.status(200).json({ results });
};

const postMovie = async (req: Request, res: Response) => {
    const { title, image, rated, releaseYear } = req.body;

    const existMovie = await MovieService.getMovieBy({ title });
    if (existMovie) return res.status(409).json({ errors: 'movie conflic' });

    const movie = { title, image, rated, releaseYear };
    await MovieService.createMovie(movie);

    return res.status(201).json({ results: 'movie created' });
};

const postCharacter = async (req: Request, res: Response) => {
    const { idMovie } = req.params;
    const { character } = req.body;

    const movie = await MovieService.getMovieById(idMovie);
    if (!movie) return res.status(404).json({ errors: 'movie not found' });

    const existCharacter = await CharacterService.getCharacterById(character);
    if (!existCharacter)
        return res.status(404).json({ errors: 'character not found' });

    if (movie.characters) {
        const existCharacterInMovie = movie.characters.find(
            (e: any) => e.character._id === character
        );
        if (existCharacterInMovie)
            return res.status(409).json({ errors: 'character conflict' });

        movie.characters.push({ character });
        await MovieService.updateMovieById(idMovie, movie);
    }
    return res.status(200).json({ results: 'movie updated' });
};

const deleteCharacter = async (req: Request, res: Response) => {
    const { idMovie, idCharacter } = req.params;

    const movie = await MovieService.getMovieById(idMovie);
    if (!movie) return res.status(404).json({ results: 'movie not found' });

    if (movie.characters) {
        const existCharacter = movie.characters.find(
            (e: any) => e.character._id === idCharacter
        );
        if (!existCharacter)
            return res.status(404).json({ results: 'character not found' });

        const characterIndex = movie.characters.findIndex(
            (e: any) => e.character._id === idCharacter
        );
        movie.characters.splice(characterIndex, 1);

        await MovieService.updateMovieById(idMovie, movie);
    }
    return res.status(200).json({ results: 'character deleted' });
};

const putMovie = async (req: Request, res: Response) => {
    const { idMovie } = req.params;
    const { title, image, rated, releaseYear } = req.body;

    const existMovie = await MovieService.getMovieById(idMovie);
    if (!existMovie) return res.status(404).json({ errors: 'movie not found' });

    const existMovieTitle = await MovieService.getMovieBy({ title });
    if (existMovieTitle)
        return res.status(409).json({ errors: 'movie conflic' });
    console.log(existMovie);
    const movie = {
        ...existMovie,
        title,
        image,
        rated,
        releaseYear
    };

    console.log(movie);
    await MovieService.updateMovieById(idMovie, movie);

    return res.status(200).json({ results: 'movie updated' });
};

const deleteMovie = async (req: Request, res: Response) => {
    const { idMovie } = req.params;

    const movie = await MovieService.getMovieById(idMovie);
    if (!movie) return res.status(404).json({ errors: 'movie not found' });

    await MovieService.deleteMovieById(idMovie);

    return res.status(200).json({ results: 'movie deleted' });
};
