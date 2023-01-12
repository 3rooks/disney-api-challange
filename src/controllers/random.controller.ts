

const randomController = async (req, res, next) => {
    try {
        await movieService.createManyMovies(await genFakerData(movieFaker, 10));

        await genderService.createManyGenders(
            await genFakerData(genderFaker, 10)
        );

        await characterService.createManyCharacters(
            await genFakerData(characterFaker, 10)
        );

        return res.status(200).json({ results: 'random data created' });
    } catch (error) {
        next(error);
    }
};

export default randomController;
