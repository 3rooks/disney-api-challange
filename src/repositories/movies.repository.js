import { ENTITIES } from '#constants/entities.js';

const excludeProjection = {
    characters: 0,
    rated: 0,
    genders: 0,
    updatedAt: 0,
    createdAt: 0
};

export class MoviesRepository {
    constructor(persistence) {
        this.entity = ENTITIES.MOVIES;
        this.repository = persistence;
    }

    getMovieById = async (id) => await this.repository.getById(this.entity, id);

    getAllMovies = async () =>
        await this.repository.getAll(this.entity, excludeProjection);

    createMovie = async (movie) =>
        await this.repository.save(this.entity, movie);

    getGenderMovies = async (idGender) => {
        const results = await this.repository.getById(
            ENTITIES.GENDERS,
            idGender
        );
        return results;
    };

    getMoviesSorted = async (sortedBy) =>
        await this.repository.getAllSorted(this.entity, sortedBy);

    getMovieByTitle = async (title) =>
        await this.repository.getBy(this.entity, { title });

    updateMovieById = async (id, movie) =>
        await this.repository.updateById(this.entity, id, movie);

    deleteMovieById = async (id) =>
        await this.repository.deleteById(this.entity, id);

    createManyMovies = async (data) =>
        await this.repository.saveMany(this.entity, data);
}
