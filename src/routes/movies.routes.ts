import { MovieController } from '@controllers/movies.controller';
import { MovieDTO } from '@dtos/movies/movie.dto';
import { Router } from 'express';

export class MovieRoutes {
    constructor(
        readonly router: Router,
        private dto: MovieDTO,
        private ctrl: MovieController
    ) {
        this.init();
    }

    private init = () => {
        this.router.get('/movies', this.dto.queries, this.ctrl.getMovies);

        this.router.get(
            '/movies/:idMovie',
            this.dto.params,
            this.ctrl.getMovieById
        );

        this.router.post('/movies', this.dto.postMovie, this.ctrl.postMovie);

        this.router.post(
            '/movies/:idMovie/character',
            this.dto.postCharacter,
            this.ctrl.postCharacter
        );

        this.router.put(
            '/movies/:idMovie',
            this.dto.putMovie,
            this.ctrl.putMovie
        );

        this.router.delete(
            '/movies/:idMovie/character/:idCharacter',
            this.dto.params,
            this.ctrl.deleteCharacter
        );

        this.router.delete(
            '/movies/:idMovie',
            this.dto.params,
            this.ctrl.deleteMovie
        );
    };
}
