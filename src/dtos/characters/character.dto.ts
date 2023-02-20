import { getByParamsDTO } from '@dtos/params/get-by-params.dto';
import { getCharacterDTO } from '@dtos/queries/get-characters.dto';
import { postCharacterDTO } from './post-character.dto';
import { postMovieDTO } from './post-movie.dto';
import { putCharacterDTO } from './put-character.dto';

export class CharacterDTO {
    readonly queries = getCharacterDTO;
    readonly params = getByParamsDTO;
    readonly postCharacter = postCharacterDTO;
    readonly postMovie = postMovieDTO;
    readonly putCharacter = putCharacterDTO;
}
