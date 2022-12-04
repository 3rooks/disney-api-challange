import { ENTITIES } from '#constants/entities.js';

export class MoviesRepository {
    constructor(persistence) {
        this.entity = ENTITIES.MOVIES;
        this.persistence = persistence;
    }

    getMoviesByTitleAsc = async (title) =>
        await this.persistence.getAll().sort({ title: 1 });

    getMoviesByTitle = async (title) =>
        await this.persistence.getBy(this.entity, { title });

    getMoviesByGenre = async (genre) =>
        await this.persistence.getBy(this.entity, { genre });

    getMoviesByOrder = async (order) => {
        if (order === 'asc') {
            const movies = await this.persistence.getAll();
            return movies.sort();
        }
    };

    getMoviesByGenreAsc = async (genre, sort) => {
        const movies = await this.persistence.getBy({ genre });
        if (sort === 'desc') return await movies.sort((a, b) => a - b);
        return await movies.sort();
    };

    updeUerBd = async (id, user) => {};

    deletseByI = async (id) => {};
}
