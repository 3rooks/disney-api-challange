import { Services } from '@services/repository.service';
import genFakerData, {
    characterFaker,
    genderFaker,
    movieFaker
} from '@utils/faker-data';
import { NextFunction, Request, Response } from 'express';

const randomController = async (
    _: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await Services.movies.createManyMovies(
            await genFakerData(movieFaker, 10)
        );

        await Services.genders.createManyGenders(
            await genFakerData(genderFaker, 10)
        );

        await Services.characters.createManyCharacters(
            await genFakerData(characterFaker, 10)
        );

        return res.status(200).json({ results: 'random data created' });
    } catch (error) {
        return next(error);
    }
};

export default randomController;
