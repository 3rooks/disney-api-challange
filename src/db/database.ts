import { ICharacter } from '@interfaces/character.interface';
import { IGender } from '@interfaces/gender.interface';
import { ModelEntities } from '@interfaces/models.interface';
import { IMovie } from '@interfaces/movie.interface';
import { IUser } from '@interfaces/user.interface';
import { CharacterModel } from '@schemas/characters.schema';
import { GenderModel } from '@schemas/genders.schema';
import { MovieModel } from '@schemas/movies.schema';
import { UserModel } from '@schemas/users.schema';
import mongoose from 'mongoose';

export class MongoDataBase {
    private readonly entities: ModelEntities<
        IUser,
        IMovie,
        IGender,
        ICharacter
    > = {
        Users: UserModel,
        Movies: MovieModel,
        Genders: GenderModel,
        Characters: CharacterModel
    };

    readonly connection = async (url: string) => {
        try {
            const db = await mongoose.connect(url);
            console.log(`Successful connection db: ${db.connection.name}`);
        } catch (error) {
            console.log(`Failed connection db: ${error}`);
        }
    };

    public save = async (entity: string, data: object) =>
        await this.entities[entity].create(data);

    public saveMany = async (entity: string, data: object) =>
        await this.entities[entity].insertMany(data);

    public getBy = async (entity: string, data: object) =>
        await this.entities[entity].findOne(data).lean().exec();

    public getAll = async (entity: string, projection: object | undefined) =>
        await this.entities[entity].find({}, projection).lean().exec();

    public getById = async (entity: string, id: string) =>
        await this.entities[entity].findById(id).lean().exec();

    public updateById = async (entity: string, id: string, data: object) =>
        await this.entities[entity].findByIdAndUpdate(id, data).lean().exec();

    public deleteById = async (entity: string, id: string) =>
        await this.entities[entity].findByIdAndDelete(id).lean().exec();

    public getAllBy = async (entity: string, data: object) =>
        await this.entities[entity].aggregate([{ $match: data }]).exec();

    public getAllSorted = async (entity: string, sort: any) =>
        await this.entities[entity].aggregate([{ $sort: sort }]).exec();
}
