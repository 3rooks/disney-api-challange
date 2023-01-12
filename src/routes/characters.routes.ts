
import { CharacterController } from '@controllers/characters.controller';
import { Router } from 'express';

const {
    postMovie,
    deleteMovie,
    getCharacter,
    putCharacter,
    postCharacter,
    deleteCharacter,
    getCharacterById
} = new CharacterController();

const charactersRoute = Router();

charactersRoute.get('/characters', getCharacter);

charactersRoute.get('/characters/:idCharacter', getCharacterById);

charactersRoute.post('/characters', postCharacter);

charactersRoute.post('/characters/:idCharacter/movie', postMovie);

charactersRoute.put('/characters/:idCharacter', putCharacter);

charactersRoute.delete('/characters/:idCharacter/movie/:idMovie', deleteMovie);

charactersRoute.delete('/characters/:idCharacter', deleteCharacter);

export default charactersRoute;
