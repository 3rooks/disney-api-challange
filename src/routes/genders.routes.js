import { GenderController } from '#controllers/genders.controller.js';
import { Router } from 'express';

const {
    postMovie,
    putGender,
    getGender,
    postGender,
    deleteMovie,
    deleteGender,
    getGenderById
} = new GenderController();

const gendersRoute = Router();

gendersRoute.get('/genders', getGender);

gendersRoute.get('/genders/:idGender', getGenderById);

gendersRoute.post('/genders', postGender);

gendersRoute.post('/genders/:idGender/movie', postMovie);

gendersRoute.put('/genders/:idGender', putGender);

gendersRoute.delete('/genders/:idGender/movie/:idMovie', deleteMovie);

gendersRoute.delete('/genders/:idGender', deleteGender);

export default gendersRoute;
