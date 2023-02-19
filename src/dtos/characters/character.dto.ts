import { idCharacterDTOParams } from '@dtos/params/id-character.dto';
import { idMovieDTOParams } from '@dtos/params/id-movie.dto';
import { getCharacterDTOQueries } from '@dtos/queries/get-characters.dto';
import { validateDTOSchema } from '@utils/dto-schema-validator';
import { postCharacterSchemaDTO } from './post-character.dto';
import { postMovieSchemaDTO } from './post-movie.dto';

const postCharacterDTOBody = validateDTOSchema(postCharacterSchemaDTO);
const postMovieDTOBody = validateDTOSchema(postMovieSchemaDTO);

export class CharacterDTO {
    readonly queries = {
        getByQuery: getCharacterDTOQueries
    };

    readonly params = {
        idCharacter: idCharacterDTOParams,
        idMovie: idMovieDTOParams
    };

    readonly body = {
        postMovie: postMovieDTOBody,
        postCharacter: postCharacterDTOBody,
        putCharacter: postCharacterDTOBody
    };
}
