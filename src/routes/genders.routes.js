import { genderCtrl } from '#controllers/genders.controller.js';
import { Router } from 'express';

const gendersRoute = Router();

gendersRoute.get('/genders', genderCtrl.getGender);

gendersRoute.post('/genders', genderCtrl.postGender);

export default gendersRoute;
