import { IGender } from '@interfaces/gender.interface';
import { genderProjection } from '@interfaces/projections/gender.projection';
import { RepositoryService } from '@services/repository.service';
import { HandlerError } from '@utils/handler-error';
import { Request, Response } from 'express';

export class GenderController extends HandlerError {
    private try = this.handlerError;

    constructor(readonly service: RepositoryService) {
        super();
    }

    public getGenders = this.try(async (_: Request, res: Response) => {
        const results = await this.service.genders.getAllGenders(
            genderProjection
        );
        return res.status(200).json({ results });
    });

    public getGenderById = this.try(async (req: Request, res: Response) => {
        const { idGender } = req.params;
        const results = await this.service.genders.getGenderById(idGender);
        if (!results)
            return res.status(404).json({ errors: 'gender not found' });
        return res.status(200).json({ results: results.movies });
    });

    public postGender = this.try(async (req: Request, res: Response) => {
        const { name, image } = req.body;

        const existGender = await this.service.genders.getGenderBy({ name });
        if (existGender)
            return res.status(409).json({ errors: 'gender conflict' });

        const gender: IGender = { name, image };
        await this.service.genders.createGender(gender);

        return res.status(201).json({ results: 'gender created' });
    });

    public postMovie = this.try(async (req: Request, res: Response) => {
        const { idGender } = req.params;
        const { movie } = req.body;

        const gender = await this.service.genders.getGenderById(idGender);

        if (!gender)
            return res.status(404).json({ errors: 'gender not found' });

        const existMovie = await this.service.movies.getMovieById(movie);
        if (!existMovie)
            return res.status(404).json({ results: 'movie not found' });

        if (gender.movies) {
            const existMovieInGender = gender.movies.find(
                (e: any) => e.movie._id === movie
            );
            if (existMovieInGender)
                return res.status(409).json({ errors: 'movie conflict' });

            gender.movies.push({ movie });

            await this.service.genders.updatedGenderById(idGender, gender);
        }
        return res.status(200).json({ results: 'gender updated' });
    });

    public putGender = this.try(async (req: Request, res: Response) => {
        const { idGender } = req.params;
        const { name, image } = req.body;

        const existGender = await this.service.genders.getGenderById(idGender);

        if (!existGender)
            return res.status(404).json({ errors: 'gender not found' });

        const gender = {
            name,
            image
        };

        await this.service.genders.updatedGenderById(idGender, gender);

        return res.status(200).json({ results: 'gender updated' });
    });

    public deleteMovie = this.try(async (req: Request, res: Response) => {
        const { idGender, idMovie } = req.params;

        const gender = await this.service.genders.getGenderById(idGender);

        if (!gender)
            return res.status(404).json({ errors: 'gender not found' });

        if (gender.movies) {
            const movie = gender.movies.find(
                (e: any) => e.movie._id === idMovie
            );
            if (!movie)
                return res.status(404).json({ errors: 'movie not found' });

            const movieIndex = gender.movies.findIndex(
                (e: any) => e.movie._id === idMovie
            );
            gender.movies.splice(movieIndex, 1);

            await this.service.genders.updatedGenderById(idGender, gender);
        }
        return res.status(200).json({ results: 'movie deleted' });
    });

    public deleteGender = this.try(async (req: Request, res: Response) => {
        const { idGender } = req.params;

        const gender = await this.service.genders.getGenderById(idGender);

        if (!gender)
            return res.status(404).json({ errors: 'gender not found' });

        await this.service.genders.deleteGenderById(idGender);

        return res.status(200).json({ results: 'gender deleted' });
    });
}
