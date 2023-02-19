import { CharacterController } from '@controllers/characters.controller';
import { GenderController } from '@controllers/genders.controller';
import { MovieController } from '@controllers/movies.controller';
import { UserController } from '@controllers/users.controller';
import { CharacterDTO } from '@dtos/characters/character.dto';
import { GenderDTO } from '@dtos/genders/gender.dto';
import { MovieDTO } from '@dtos/movies/movie.dto';
import { UserDTO } from '@dtos/users/user.dto';
import { Services } from '@services/repository.service';
import { Router } from 'express';
import { CharacterRoutes } from './characters.routes';
import { GenderRoutes } from './genders.routes';
import { MovieRoutes } from './movies.routes';
import { UserRoutes } from './users.routes';

export class Routes {
    readonly characters = new CharacterRoutes(
        Router(),
        new CharacterDTO(),
        new CharacterController(Services)
    );

    readonly genders = new GenderRoutes(
        Router(),
        new GenderDTO(),
        new GenderController(Services)
    );

    readonly movies = new MovieRoutes(
        Router(),
        new MovieDTO(),
        new MovieController(Services)
    );

    readonly users = new UserRoutes(
        Router(),
        new UserDTO(),
        new UserController(Services)
    );
}
