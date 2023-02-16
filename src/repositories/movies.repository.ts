import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { ID } from '@interfaces/id.type';
import { IMovie } from '@interfaces/movie.interface';
import { LeanDocument, NullExpression } from 'mongoose';

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

    public createMovie = async (
        movie: IMovie
    ): Promise<IMovie | NullExpression> =>
        await this.persistence.save(this.entity, movie);

    public createManyMovies = async (
        data: IMovie[]
    ): Promise<IMovie[] | NullExpression> =>
        await this.persistence.saveMany(this.entity, data);

    public getAllMovies = async (): Promise<
        LeanDocument<IMovie>[] | NullExpression
    > => await this.persistence.getAll(this.entity, excludeProjection);

    public getMovieById = async (
        id: ID
    ): Promise<LeanDocument<IMovie> | NullExpression> =>
        await this.persistence.getById(this.entity, id);

    public getMovieBy = async (
        getBy: object
    ): Promise<LeanDocument<IMovie> | NullExpression> =>
        await this.persistence.getBy(this.entity, getBy);

    public updateMovieById = async (
        id: ID,
        movie: IMovie
    ): Promise<LeanDocument<IMovie> | NullExpression> =>
        await this.persistence.updateById(this.entity, id, movie);

    public deleteMovieById = async (
        id: ID
    ): Promise<LeanDocument<IMovie> | NullExpression> =>
        await this.persistence.deleteById(this.entity, id);

    public getMoviesSorted = async (
        sortBy: object
    ): Promise<IMovie[] | NullExpression> =>
        await this.persistence.getAllSorted(this.entity, sortBy);
}
