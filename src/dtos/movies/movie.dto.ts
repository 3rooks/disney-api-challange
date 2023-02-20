import { getByParamsDTO } from '@dtos/params/get-by-params.dto';
import { getMoviesDTO } from '@dtos/queries/get-movies.dto';
import { postCharacterDTO } from './post-character.dto';
import { postMovieDTO } from './post-movie.dto';
import { putMovieDTO } from './put-movie';

export class MovieDTO {
    readonly queries = getMoviesDTO;
    readonly params = getByParamsDTO;
    readonly postCharacter = postCharacterDTO;
    readonly postMovie = postMovieDTO;
    readonly putMovie = putMovieDTO;
}
