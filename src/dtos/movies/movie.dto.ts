import { idCharacterDTOParams } from '@dtos/params/id-character.dto';
import { idMovieDTOParams } from '@dtos/params/id-movie.dto';
import { validateDTOSchema } from '@utils/dto-schema-validator';
import { postMovieSchemaDTO } from './post-movie.dto';

const postMovieDTOBody = validateDTOSchema(postMovieSchemaDTO);

export class MovieDTO {
    readonly params = {
        idCharacter: idCharacterDTOParams,
        idMovie: idMovieDTOParams
    };

    readonly body = {
        postMovie: postMovieDTOBody,
        putMovie: postMovieDTOBody
    };
}
