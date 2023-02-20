import { idGenderDTOParams } from '@dtos/params/id-gender.dto';
import { idMovieDTOParams } from '@dtos/params/id-movie.dto';
import { validateDTOSchema } from '@utils/dto-schema-validator';
import { postGenderSchemaDTO } from './post-gender.dto';

const postGenderDTOBody = validateDTOSchema(postGenderSchemaDTO);

export class GenderDTO {
    readonly params = {
        idGender: idGenderDTOParams,
        idMovie: idMovieDTOParams
    };

    readonly body = {
        postGender: postGenderDTOBody,
        putGender: postGenderDTOBody
    };
}
