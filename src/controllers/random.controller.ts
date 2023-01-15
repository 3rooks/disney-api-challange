import {
    CharacterService,
    GenderService,
    MovieService
} from '@services/repository.service';
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
        await MovieService.createManyMovies(await genFakerData(movieFaker, 10));

        await GenderService.createManyGenders(
            await genFakerData(genderFaker, 10)
        );

        await CharacterService.createManyCharacters(
            await genFakerData(characterFaker, 10)
        );

        return res.status(200).json({ results: 'random data created' });
    } catch (error) {
        return next(error);
    }
};

export default randomController;
