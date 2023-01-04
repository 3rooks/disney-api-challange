import { CharacterController } from '#controllers/characters.controller.js';
import { Router } from 'express';

const { getCharacter, postCharacter, deleteCharacter, postMovie } =
    new CharacterController();

const charactersRoute = Router();

charactersRoute.get('/characters', getCharacter);

charactersRoute.post('/characters', postCharacter);

charactersRoute.post('/characters/:idCharacter', postMovie);

charactersRoute.delete('/characters/:idCharacter', deleteCharacter);

export default charactersRoute;
