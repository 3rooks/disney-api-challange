import {
    characterService,
    genderService,
    movieService
} from '#services/repository.service.js';

export class MovieController {
    getMovies = async (req, res, next) => {
        try {
            if (Object.keys(req.query).length === 0) {
                const results = await movieService.getAllMovies();
                return res.status(200).json(results);
            }

            const results = await movieService.getMoviesByTitleAsc(req.query);
            if (!results)
                return res.status(400).json({ errors: 'bad request' });

            return res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    };

    postMovie = async (req, res, next) => {
        try {
            const results = await movieService.createMovie(req.body);
            return res.send(201).json({ results });
        } catch (error) {
            next(error);
        }
    };

    postGender = async (req, res, next) => {
        try {
            const { idMovie } = req.params;
            const { gender } = req.body;

            const movie = await movieService.getMovieById(idMovie);
            if (!movie)
                return res.status(404).json({ errors: 'movie not found' });

            const existGender = await genderService.getGenderById(gender);
            if (!existGender)
                return res.status(404).json({ errors: 'gender not found' });

            movie.genders.push({ gender });
            await movieService.updateMovieById(idMovie, movie);

            return res.status(200).json({ results: 'movie updated' });
        } catch (error) {
            next(error);
        }
    };

    postCharacter = async (req, res, next) => {
        try {
            const { idMovie } = req.params;
            const { character } = req.body;

            const movie = await movieService.getMovieById(idMovie);
            if (!movie)
                return res.status(404).json({ errors: 'movie not found' });

            const existCharacter = await characterService.getCharacterById(
                character
            );
            if (!existCharacter)
                return res.status(404).json({ errors: 'character not found' });

            movie.characters.push({ character });
            await movieService.updateMovieById(idMovie, movie);

            return res.status(200).json({ results: 'movie updated' });
        } catch (error) {
            next(error);
        }
    };

    putMovie = async (req, res, next) => {
        try {
            const { idMovie } = req.params;
            const { title, image, rated, releaseYear } = req.body;

            const movie = await movieService.getMovieById(idMovie);
            const { genders, characters } = movie;

            if (!movie)
                return res.status(404).json({ errors: 'movie not found' });

            const putMovie = {
                title,
                image,
                rated,
                releaseYear,
                genders,
                characters
            };

            await movieService.updateMovieById(idMovie, putMovie);

            return res.status(200).json({ results: 'movie updated' });
        } catch (error) {
            next(error);
        }
    };

    deleteMovie = async (req, res, next) => {
        try {
            const { idMovie } = req.params;

            const movie = await movieService.getMovieById(idMovie);
            if (!movie)
                return res.status(404).json({ errors: 'movie not found' });

            await movieService.deleteMovieById(idMovie);

            return res.status(200).json({ results: 'movie deleted' });
        } catch (error) {
            next(error);
        }
    };
}
