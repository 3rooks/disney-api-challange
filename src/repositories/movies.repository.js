import { ENTITIES } from '#constants/entities.js';
import { ORDERS } from '#constants/order.js';

export class MoviesRepository {
    constructor(persistence) {
        this.entity = ENTITIES.MOVIES;
        this.repository = persistence;
    }

    getAllMovies = async () =>
        await this.repository.getAll(this.entity, {
            image: 1,
            title: 1,
            createdAt: 1
        });

    createMovie = async (movie) =>
        await this.repository.save(this.entity, movie);

    getMoviesByTitleAsc = async (queries) => {
        const { title, gender, order } = queries;

        if (title && !gender && !order) {
            return await this.repository.getBy(this.entity, { title });
        } else if (gender && !title && !order) {
            return await this.repository.getAllBy(this.entity, { gender });
        } else if (order && !title && !gender) {
            if (order === Object.keys(ORDERS)[0]) {
                return await this.repository.getAllSortAsc(this.entity);
            } else if (order === Object.keys(ORDERS)[1]) {
                return this.repository.getAllSortDesc(this.entity);
            }
        } else if (gender && order && !title) {
            if (order.toUpperCase() === Object.keys(ORDERS)[0]) {
                return await this.repository.getByGenreAndOrder(
                    this.entity,
                    { gender },
                    ORDERS.ASC
                );
            } else if (order.toUpperCase() === Object.keys(ORDERS)[1]) {
                return await this.repository.getByGenreAndOrder(
                    this.entity,
                    { gender },
                    ORDERS.DESC
                );
            }
        } else {
            return undefined;
        }
    };

    getMoviesByTitle = async (title) =>
        await this.repository.getBy(this.entity, { title });

    getMoviesByGenre = async (genre) =>
        await this.repository.getBy(this.entity, { genre });

    getMoviesByOrder = async (order) => {
        if (order === 'asc') {
            const movies = await this.repository.getAll();
            return movies.sort();
        }
    };

    getMoviesByGenreAsc = async (genre, sort) => {
        const movies = await this.repository.getBy({ genre });
        if (sort === 'desc') return await movies.sort((a, b) => a - b);
        return await movies.sort();
    };

    updeUerBd = async (id, user) => {};

    deletseByI = async (id) => {};
}
