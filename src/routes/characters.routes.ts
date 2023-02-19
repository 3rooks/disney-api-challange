import { CharacterController } from '@controllers/characters.controller';
import { CharacterDTO } from '@dtos/characters/character.dto';
import { Router } from 'express';

export class CharacterRoutes {
    constructor(
        readonly router: Router,
        private dto: CharacterDTO,
        private ctrl: CharacterController
    ) {
        this.init();
    }

    private init = () => {
        this.router.get(
            '/characters',
            this.dto.queries.getByQuery,
            this.ctrl.getCharacters
        );

        this.router.get(
            '/characters/:idCharacter',
            this.dto.params.idCharacter,
            this.ctrl.getCharacterById
        );

        this.router.post(
            '/characters',
            this.dto.body.postCharacter,
            this.ctrl.postCharacter
        );

        this.router.post(
            '/characters/:idCharacter/movie',
            this.dto.params.idCharacter,
            this.dto.body.postMovie,
            this.ctrl.postMovie
        );

        this.router.put(
            '/characters/:idCharacter',
            this.dto.params.idCharacter,
            this.dto.body.putCharacter,
            this.ctrl.putCharacter
        );

        this.router.delete(
            '/characters/:idCharacter/movie/:idMovie',
            this.dto.params.idCharacter,
            this.dto.params.idMovie,
            this.ctrl.deleteMovie
        );

        this.router.delete(
            '/characters/:idCharacter',
            this.dto.params.idCharacter,
            this.ctrl.deleteCharacter
        );
    };
}
