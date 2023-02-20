import { GenderController } from '@controllers/genders.controller';
import { GenderDTO } from '@dtos/genders/gender.dto';
import { Router } from 'express';

export class GenderRoutes {
    constructor(
        readonly router: Router,
        private dto: GenderDTO,
        private ctrl: GenderController
    ) {
        this.init();
    }

    private init = () => {
        this.router.get('/genders', this.ctrl.getGenders);

        this.router.get(
            '/genders/:idGender',
            this.dto.params,
            this.ctrl.getGenderById
        );

        this.router.post('/genders', this.dto.postGender, this.ctrl.postGender);

        this.router.post(
            '/genders/:idGender/movie',
            this.dto.postMovie,
            this.ctrl.postMovie
        );

        this.router.put(
            '/genders/:idGender',
            this.dto.putGender,
            this.ctrl.putGender
        );

        this.router.delete(
            '/genders/:idGender/movie/:idMovie',
            this.dto.params,
            this.ctrl.deleteMovie
        );

        this.router.delete(
            '/genders/:idGender',
            this.dto.params,
            this.ctrl.deleteGender
        );
    };
}
