import { Router } from 'express';

const moviesRoute = Router();

moviesRoute.get('/', (req, res) => {
    return res.send('hello');
});

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
