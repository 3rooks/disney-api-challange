import { ENTITIES } from '#constants/entities.js';
import { ORDERS } from '#constants/order.js';

const proyection = {
    image: 1,
    title: 1,
    createdAt: 1
};

export class MoviesRepository {
    constructor(persistence) {
        this.entity = ENTITIES.MOVIES;
        this.repository = persistence;
    }

    getMovieById = async (id) => await this.repository.getById(this.entity, id);

    getAllMovies = async () =>
        await this.repository.getAll(this.entity, proyection);

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
                return await this.repository.getAllSort(this.entity, {
                    createdAt: ORDERS.ASC
                });
            } else if (order === Object.keys(ORDERS)[1]) {
                return this.repository.getAllSort(this.entity, {
                    createdAt: ORDERS.DESC
                });
            }
        } else if (gender && order && !title) {
            if (order.toUpperCase() === Object.keys(ORDERS)[0]) {
                return await this.repository.getByGenreAndOrder(
                    this.entity,
                    { gender },
                    { title: ORDERS.ASC }
                );
            } else if (order.toUpperCase() === Object.keys(ORDERS)[1]) {
                return await this.repository.getByGenreAndOrder(
                    this.entity,
                    { gender },
                    { title: ORDERS.DESC }
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

    updateMovieById = async (id, movie) =>
        await this.repository.updateById(this.entity, id, movie);

    deleteMovieById = async (id) =>
        await this.repository.deleteById(this.entity, id);

    createManyMovies = async (data) =>
        await this.repository.saveMany(this.entity, data);
}
