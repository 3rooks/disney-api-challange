import { registerUser } from '#controllers/users.controller.js';
import { Router } from 'express';

const usersRoute = Router();

usersRoute.post('/auth/register', registerUser);

usersRoute.post('/auth/login', (req, res) => {
    return res.send('hello');
});

usersRoute.patch('/', (req, res) => {
    return res.send('hello');
});

usersRoute.delete('/', (req, res) => {
    return res.send('hello');
});

export default usersRoute;
