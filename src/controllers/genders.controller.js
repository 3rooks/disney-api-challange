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

    getGenderById = async (req, res, next) => {
        try {
            const { idGender } = req.params;

            const results = await genderService.getGenderById(idGender);
            if (!results)
                return res.status(404).json({ errors: 'gender not found' });

            return res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };

    postGender = async (req, res, next) => {
        try {
            const { name, image } = req.body;

            const existGender = await genderService.getGenderBy({ name });
            if (existGender)
                return res.status(409).json({ errors: 'gender conflict' });

            const gender = { name, image };
            await genderService.createGender(gender);

            return res.status(201).json({ results: 'gender created' });
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

            const existMovieInGender = gender.movies.find(
                (e) => e.movie._id === movie
            );
            if (existMovieInGender)
                return res.status(409).json({ errors: 'movie conflict' });

            gender.movies.push({ movie });

            await genderService.updatedGenderById(idGender, gender);

            return res.status(200).json({ results: 'gender updated' });
        } catch (error) {
            next(error);
        }
    };

    deleteMovie = async (req, res, next) => {
        try {
            const { idGender, idMovie } = req.params;

            const gender = await genderService.getGenderById(idGender);
            if (!gender)
                return res.status(404).json({ errors: 'gender not found' });

            const movie = gender.movies.find((e) => e.movie._id === idMovie);
            if (!movie)
                return res.status(404).json({ errors: 'movie not found' });

            const movieIndex = gender.movies.findIndex(
                (e) => e.movie._id === idMovie
            );
            gender.movies.splice(movieIndex, 1);

            await genderService.updatedGenderById(idGender, gender);

            return res.status(200).json({ results: 'movie deleted' });
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
