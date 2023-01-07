import { ORDERS } from '#constants/order.js';
import {
    characterService,
    movieService
} from '#services/repository.service.js';

export class MovieController {
    getMovies = async (req, res, next) => {
        try {
            if (Object.keys(req.query).length === 0) {
                const results = await movieService.getAllMovies();
                return res.status(200).json({ results });
            }

            const { title, gender, order } = req.query;

            if (title && !gender && !order) {
                const results = await movieService.getMovieByTitle(title);
                !results && res.status(404).json({ errors: 'movie not found' });
                return res.status(200).json({ results });
            } else if (gender && !title && !order) {
                const results = await movieService.getGenderMovies(gender);
                !results &&
                    res.status(404).json({ errors: 'gender not found' });
                return res.status(200).json({ results: results.movies });
            } else if (order && !title && !gender) {
                if (order === Object.keys(ORDERS)[0]) {
                    const results = await movieService.getMoviesSorted({
                        releaseYear: ORDERS.ASC
                    });
                    return res.status(200).json({ results });
                } else if (order === Object.keys(ORDERS)[1]) {
                    const results = await movieService.getMoviesSorted({
                        releaseYear: ORDERS.DESC
                    });
                    return res.status(200).json({ results });
                } else return res.status(400).json({ errors: 'bad request' });
            } else {
                return res.status(400).json({ errors: 'bad request' });
            }
        } catch (error) {
            next(error);
        }
    };

    postMovie = async (req, res, next) => {
        try {
            await movieService.createMovie(req.body);
            return res.status(201).json({ results: 'movie created' });
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

            if (!movie)
                return res.status(404).json({ errors: 'movie not found' });

            const putMovie = {
                title,
                image,
                rated,
                releaseYear
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
