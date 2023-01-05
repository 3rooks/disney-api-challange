import { genderService, movieService } from '#services/repository.service.js';

export class GenderController {
    getGender = async (req, res, next) => {
        try {
            const results = await genderService.getAllGenders();
            res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };

    postGender = async (req, res, next) => {
        try {
            const results = await genderService.createGender(req.body);
            return res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };

    postMovie = async (req, res, next) => {
        try {
            const { idGender } = req.params;
            const { movie } = req.body;

            const gender = await genderService.getGenderById(idGender);
            if (!gender)
                return res.status(404).json({ errors: 'gender not found' });

            const existMovie = await movieService.getMovieById(movie);
            if (!existMovie)
                return res.status(404).json({ results: 'movie not found' });

            gender.movies.push({ movie });

            await genderService.updatedGenderById(idGender, gender);

            return res.status(200).json({ results: 'gender updated' });
        } catch (error) {
            next(error);
        }
    };

    deleteGender = async (req, res, next) => {
        try {
            const { idGender } = req.params;

            const gender = await genderService.getGenderById(idGender);
            if (!gender)
                return res.status(404).json({ errors: 'gender not found' });

            await genderService.deleteGenderById(idGender);

            return res.status(200).json({ results: 'gender deleted' });
        } catch (error) {
            next(error);
        }
    };
}
