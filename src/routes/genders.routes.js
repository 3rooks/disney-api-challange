import { GenderController } from '#controllers/genders.controller.js';
import { Router } from 'express';

const {
    getGender,
    postGender,
    deleteGender,
    postMovie,
    getGenderById,
    deleteMovie
} = new GenderController();

const gendersRoute = Router();

gendersRoute.get('/genders', getGender);

gendersRoute.get('/genders/:idGender', getGenderById);

gendersRoute.post('/genders', postGender);

gendersRoute.post('/genders/:idGender/movie', postMovie);

gendersRoute.delete('/genders/:idGender/movie/:idMovie', deleteMovie);

gendersRoute.delete('/genders/:idGender', deleteGender);

export default gendersRoute;
