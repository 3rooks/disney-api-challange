import { Router } from 'express';

const charactersRoute = Router();

charactersRoute.get('/', (req, res) => {
    return res.send('hello');
});

charactersRoute.post('/', (req, res) => {
    return res.send('hello');
});

charactersRoute.patch('/', (req, res) => {
    return res.send('hello');
});

charactersRoute.delete('/', (req, res) => {
    return res.send('hello');
});

export default charactersRoute;
