import { ORDERS } from '#constants/order.js';
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
                return res.status(200).json({ results });
            }

            const { title, gender, order } = req.query;

            // todo
            if (title && !gender && !order) {
                const results = await movieService.getMovieBy({ title });
                if (!results)
                    return res.status(404).json({ errors: 'movie not found' });
                return res.status(200).json({ results });
            } else if (gender && !title && !order) {
                const results = await genderService.getGenderById(gender);
                if (!results)
                    return res.status(404).json({ errors: 'gender not found' });
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
            } else return res.status(400).json({ errors: 'bad request' });
        } catch (error) {
            next(error);
        }
    };

    postMovie = async (req, res, next) => {
        try {
            const { title, image, rated, releaseYear } = req.body;

            const existMovie = await movieService.getMovieBy({ title });
            if (existMovie)
                return res.status(409).json({ errors: 'movie conflic' });

            const movie = { title, image, rated, releaseYear };
            await movieService.createMovie(movie);

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

            const existCharacterInMovie = movie.characters.find(
                (e) => e.character._id === character
            );
            if (existCharacterInMovie)
                return res.status(409).json({ errors: 'character conflict' });

            movie.characters.push({ character });
            await movieService.updateMovieById(idMovie, movie);

            return res.status(200).json({ results: 'movie updated' });
        } catch (error) {
            next(error);
        }
    };

    deleteCharacter = async (req, res, next) => {
        try {
            const { idMovie, idCharacter } = req.params;

            const movie = await movieService.getMovieById(idMovie);
            if (!movie)
                return res.status(404).json({ results: 'movie not found' });

            const existCharacter = await movie.characters.find(
                (e) => e.character._id === idCharacter
            );
            if (!existCharacter)
                return res.status(404).json({ results: 'character not found' });

            const characterIndex = movie.characters.findIndex(
                (e) => e.character._id === idCharacter
            );
            movie.characters.splice(characterIndex, 1);

            await movieService.updateMovieById(idMovie, movie);

            return res.status(200).json({ results: 'character deleted' });
        } catch (error) {
            next(error);
        }
    };

    putMovie = async (req, res, next) => {
        try {
            const { idMovie } = req.params;
            const { title, image, rated, releaseYear } = req.body;

            const existMovie = await movieService.getMovieById(idMovie);
            if (!existMovie)
                return res.status(404).json({ errors: 'movie not found' });

            const existMovieTitle = await movieService.getMovieBy({ title });
            if (existMovieTitle)
                return res.status(409).json({ errors: 'movie conflic' });

            const movie = {
                title,
                image,
                rated,
                releaseYear
            };
            await movieService.updateMovieById(idMovie, movie);

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
