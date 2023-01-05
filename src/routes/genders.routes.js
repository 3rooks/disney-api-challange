import { GenderController } from '#controllers/genders.controller.js';
import { Router } from 'express';

const { getGender, postGender, deleteGender, postMovie } =
    new GenderController();

const gendersRoute = Router();

gendersRoute.get('/genders', getGender);

gendersRoute.post('/genders', postGender);

gendersRoute.post('/genders/:idGender/movie', postMovie);

gendersRoute.delete('/genders/:idGender', deleteGender);

export default gendersRoute;
