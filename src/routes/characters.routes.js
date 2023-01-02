import { characterCtrl } from '#controllers/characters.controller.js';
import { Router } from 'express';

const charactersRoute = Router();

charactersRoute.get('/characters', characterCtrl.getCharacter);

charactersRoute.post('/characters', characterCtrl.postCharacter);

export default charactersRoute;
