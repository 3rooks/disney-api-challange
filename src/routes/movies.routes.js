import { MovieController } from '#controllers/movies.controller.js';
import { Router } from 'express';

const { putMovie, getMovies, postMovie, deleteMovie, postCharacter } =
    new MovieController();

const moviesRoute = Router();

moviesRoute.get('/movies', getMovies);

moviesRoute.post('/movies', postMovie);

moviesRoute.post('/movies/:idMovie/character', postCharacter);

moviesRoute.put('/movies/:idMovie', putMovie);

moviesRoute.delete('/movies/:idMovie', deleteMovie);

export default moviesRoute;
