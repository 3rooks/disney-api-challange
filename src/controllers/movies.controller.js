import { movieService } from '#services/repository.service.js';

export const createMovieCtrl = async (req, res, next) => {
    try {
        const results = await movieService.createMovie(req.body);
        return res.send(201).json({ results });
    } catch (error) {
        next(error);
    }
};

export const getMovies = async (req, res, next) => {
    try {
        if (Object.keys(req.query).length === 0) {
            const results = await movieService.getAllMovies();
            return res.status(200).json(results);
        }

        const results = await movieService.getMoviesByTitleAsc(req.query);

        if (!results) return res.status(400).json({ errors: 'bad request' });

        return res.status(200).json({ results });
    } catch (error) {
        next(error);
    }
};
  