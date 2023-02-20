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
            this.dto.params.idGender,
            this.ctrl.getGenderById
        );

        this.router.post(
            '/genders',
            this.dto.body.postGender,
            this.ctrl.postGender
        );

        this.router.post(
            '/genders/:idGender/movie',
            this.dto.params.idGender,
            this.ctrl.postMovie
        );

        this.router.put(
            '/genders/:idGender',
            this.dto.params.idGender,
            this.dto.body.putGender,
            this.ctrl.putGender
        );

        this.router.delete(
            '/genders/:idGender/movie/:idMovie',
            this.dto.params.idGender,
            this.dto.params.idMovie,
            this.ctrl.deleteMovie
        );

        this.router.delete(
            '/genders/:idGender',
            this.dto.params.idGender,
            this.ctrl.deleteGender
        );
    };
}
