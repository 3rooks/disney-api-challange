import { createMovieCtrl, getMovies } from '#controllers/movies.controller.js';
import { Router } from 'express';

const moviesRoute = Router();

moviesRoute.get('/movies', getMovies);

moviesRoute.post('/movies', createMovieCtrl);

moviesRoute.patch('/', (req, res) => {
    return res.send('hello');
});

moviesRoute.delete('/', (req, res) => {
    return res.send('hello');
});

export default moviesRoute;
