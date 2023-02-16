import { GenderService, MovieService } from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class GenderController extends HandlerError {
    private try = this.handlerError;

    public getGender = this.try(getGender);

    public getGenderById = this.try(getGenderById);

    public postGender = this.try(postGender);

    public postMovie = this.try(postMovie);

    public putGender = this.try(putGender);

    public deleteMovie = this.try(deleteMovie);

    public deleteGender = this.try(deleteGender);
}

const getGender = async (_: Request, res: Response) => {
    const excludeProjection = {
        movies: 0,
        createdAt: 0,
        updatedAt: 0
    };
    const results = await GenderService.getAllGenders(excludeProjection);
    res.status(200).json({ results });
};

const getGenderById = async (req: Request, res: Response) => {
    const { idGender } = req.params;

    const results = await GenderService.getGenderById(idGender);
    if (!results) return res.status(404).json({ errors: 'gender not found' });
    /**
     * retorna las peliculas de un genero
     */
    return res.status(200).json({ results: results.movies });
};

const postGender = async (req: Request, res: Response) => {
    const { name, image } = req.body;

    const existGender = await GenderService.getGenderBy({ name });
    if (existGender) return res.status(409).json({ errors: 'gender conflict' });

    const gender = { name, image };
    await GenderService.createGender(gender);

    return res.status(201).json({ results: 'gender created' });
};

const postMovie = async (req: Request, res: Response) => {
    const { idGender } = req.params;
    const { movie } = req.body;

    const gender = await GenderService.getGenderById(idGender);
    if (!gender) return res.status(404).json({ errors: 'gender not found' });

    const existMovie = await MovieService.getMovieById(movie);
    if (!existMovie)
        return res.status(404).json({ results: 'movie not found' });

    if (gender.movies) {
        const existMovieInGender = gender.movies.find(
            (e: any) => e.movie._id === movie
        );
        if (existMovieInGender)
            return res.status(409).json({ errors: 'movie conflict' });

        gender.movies.push({ movie });

        await GenderService.updatedGenderById(idGender, gender);
    }
    return res.status(200).json({ results: 'gender updated' });
};

const putGender = async (req: Request, res: Response) => {
    const { idGender } = req.params;
    const { name, image } = req.body;

    const existGender = await GenderService.getGenderById(idGender);
    if (!existGender)
        return res.status(404).json({ errors: 'gender not found' });

    const gender = {
        name,
        image
    };

    await GenderService.updatedGenderById(idGender, gender);

    return res.status(200).json({ results: 'gender updated' });
};

const deleteMovie = async (req: Request, res: Response) => {
    const { idGender, idMovie } = req.params;

    const gender = await GenderService.getGenderById(idGender);
    if (!gender) return res.status(404).json({ errors: 'gender not found' });

    if (gender.movies) {
        const movie = gender.movies.find((e: any) => e.movie._id === idMovie);
        if (!movie) return res.status(404).json({ errors: 'movie not found' });

        const movieIndex = gender.movies.findIndex(
            (e: any) => e.movie._id === idMovie
        );
        gender.movies.splice(movieIndex, 1);

        await GenderService.updatedGenderById(idGender, gender);
    }
    return res.status(200).json({ results: 'movie deleted' });
};

const deleteGender = async (req: Request, res: Response) => {
    const { idGender } = req.params;

    const gender = await GenderService.getGenderById(idGender);
    if (!gender) return res.status(404).json({ errors: 'gender not found' });

    await GenderService.deleteGenderById(idGender);

    return res.status(200).json({ results: 'gender deleted' });
};
