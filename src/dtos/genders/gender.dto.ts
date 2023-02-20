import { getByParamsDTO } from '@dtos/params/get-by-params.dto';
import { postGenderDTO } from './post-gender.dto';
import { postMovieDTO } from './post-movie.dto';
import { putGenderDTO } from './put-gender.dto';

export class GenderDTO {
    readonly params = getByParamsDTO;
    readonly postGender = postGenderDTO;
    readonly postMovie = postMovieDTO;
    readonly putGender = putGenderDTO;
}
