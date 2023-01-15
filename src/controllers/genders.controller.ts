import { GenderService, MovieService } from '@services/repository.service';
import { NextFunction, Request, Response } from 'express';

export class GenderController {
    getGender = async (_: Request, res: Response, next: NextFunction) => {
        try {
            const results = await GenderService.getAllGenders();
            res.status(200).json({ results });
        } catch (error) {
            return next(error);
        }
    };

    getGenderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idGender } = req.params;

            const results = await GenderService.getGenderById(idGender);
            if (!results)
                return res.status(404).json({ errors: 'gender not found' });

            return res.status(200).json({ results });
        } catch (error) {
            return next(error);
        }
    };

    postGender = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, image } = req.body;

            const existGender = await GenderService.getGenderBy({ name });
            if (existGender)
                return res.status(409).json({ errors: 'gender conflict' });

            const gender = { name, image };
            await GenderService.createGender(gender);

            return res.status(201).json({ results: 'gender created' });
        } catch (error) {
            return next(error);
        }
    };

    postMovie = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idGender } = req.params;
            const { movie } = req.body;

            const gender = await GenderService.getGenderById(idGender);
            if (!gender)
                return res.status(404).json({ errors: 'gender not found' });

            const existMovie = await MovieService.getMovieById(movie);
            if (!existMovie)
                return res.status(404).json({ results: 'movie not found' });

            const existMovieInGender = gender.movies.find(
                (e: any) => e.movie._id === movie
            );
            if (existMovieInGender)
                return res.status(409).json({ errors: 'movie conflict' });

            gender.movies.push({ movie });

            await GenderService.updatedGenderById(idGender, gender);

            return res.status(200).json({ results: 'gender updated' });
        } catch (error) {
            return next(error);
        }
    };

    putGender = async (req: Request, res: Response, next: NextFunction) => {
        try {
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
        } catch (error) {
            return next(error);
        }
    };

    deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idGender, idMovie } = req.params;

            const gender = await GenderService.getGenderById(idGender);
            if (!gender)
                return res.status(404).json({ errors: 'gender not found' });

            const movie = gender.movies.find(
                (e: any) => e.movie._id === idMovie
            );
            if (!movie)
                return res.status(404).json({ errors: 'movie not found' });

            const movieIndex = gender.movies.findIndex(
                (e: any) => e.movie._id === idMovie
            );
            gender.movies.splice(movieIndex, 1);

            await GenderService.updatedGenderById(idGender, gender);

            return res.status(200).json({ results: 'movie deleted' });
        } catch (error) {
            return next(error);
        }
    };

    deleteGender = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { idGender } = req.params;

            const gender = await GenderService.getGenderById(idGender);
            if (!gender)
                return res.status(404).json({ errors: 'gender not found' });

            await GenderService.deleteGenderById(idGender);

            return res.status(200).json({ results: 'gender deleted' });
        } catch (error) {
            return next(error);
        }
    };
}
