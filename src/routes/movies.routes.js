import { moviesCtrl } from '#controllers/movies.controller.js';
import { validateQuery } from '#dtos/movies/query-params.js';
import { Router } from 'express';

const moviesRoute = Router();

moviesRoute.get('/movies', validateQuery, moviesCtrl);

moviesRoute.post('/', (req, res) => {
    return res.send('hello');
});

moviesRoute.patch('/', (req, res) => {
    return res.send('hello');
});

moviesRoute.delete('/', (req, res) => {
    return res.send('hello');
});

export default moviesRoute;
