import randomController from '#controllers/random.controller.js';
import { Router } from 'express';

const randomRoute = Router();

randomRoute.post('/data', randomController);

export default randomRoute;
