import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { ID } from '@interfaces/id.type';
import { IMovie } from '@interfaces/movie.interface';

const excludeProjection = {
    _id: 0,
    characters: 0,
    rated: 0,
    genders: 0,
    updatedAt: 0,
    createdAt: 0
};

export class MoviesRepository {
    readonly entity = ENTITIES.MOVIES;

    constructor(private persistence: MongoDataBase) {}

    public getMovieById = async (id: ID): Promise<IMovie | null> =>
        await this.persistence.getById(this.entity, id);

    public getAllMovies = async (): Promise<IMovie[] | null> =>
        await this.persistence.getAll(this.entity, excludeProjection);

    public createMovie = async (movie: IMovie): Promise<IMovie | null> =>
        await this.persistence.save(this.entity, movie);

    public getMoviesSorted = async (sortBy: object): Promise<IMovie[] | null> =>
        await this.persistence.getAllSorted(this.entity, sortBy);

    public getMovieBy = async (getBy: object): Promise<IMovie | null> =>
        await this.persistence.getBy(this.entity, getBy);

    public updateMovieById = async (
        id: ID,
        movie: IMovie
    ): Promise<IMovie | null> =>
        await this.persistence.updateById(this.entity, id, movie);

    public deleteMovieById = async (id: ID): Promise<IMovie | null> =>
        await this.persistence.deleteById(this.entity, id);

    public createManyMovies = async (
        data: IMovie[]
    ): Promise<IMovie[] | null> =>
        await this.persistence.saveMany(this.entity, data);
}
