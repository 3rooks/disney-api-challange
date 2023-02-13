import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { IMovie } from '@interfaces/movie.interface';

const excludeProjection = {
    characters: 0,
    rated: 0,
    genders: 0,
    updatedAt: 0,
    createdAt: 0
};

export class MoviesRepository {
    readonly entity = ENTITIES.MOVIES;

    constructor(private persistence: MongoDataBase) {}

    getMovieById = async (id: string): Promise<IMovie | null> =>
        await this.persistence.getById(this.entity, id);

    getAllMovies = async (): Promise<IMovie[] | null> =>
        await this.persistence.getAll(this.entity, excludeProjection);

    createMovie = async (movie: IMovie) =>
        await this.persistence.save(this.entity, movie);

    getMoviesSorted = async (sortBy: object) =>
        await this.persistence.getAllSorted(this.entity, sortBy);

    getMovieBy = async (getBy: object) =>
        await this.persistence.getBy(this.entity, getBy);

    updateMovieById = async (id: string, movie: IMovie) =>
        await this.persistence.updateById(this.entity, id, movie);

    deleteMovieById = async (id: string) =>
        await this.persistence.deleteById(this.entity, id);

    createManyMovies = async (data: IMovie[]) =>
        await this.persistence.saveMany(this.entity, data);
}
