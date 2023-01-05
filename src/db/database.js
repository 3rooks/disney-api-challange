import { ENTITIES } from '#constants/entities.js';
import { characterModel } from '#schemas/characters.schema.js';
import { genderModel } from '#schemas/genders.schema.js';
import { movieModel } from '#schemas/movies.schema.js';
import { userModel } from '#schemas/users.schema.js';
import mongoose from 'mongoose';

export class MongoDataBase {
    constructor(url) {
        this.connection(url);
        this.models = {
            [ENTITIES.USERS]: userModel,
            [ENTITIES.MOVIES]: movieModel,
            [ENTITIES.GENDERS]: genderModel,
            [ENTITIES.CHARACTERS]: characterModel
        };
    }

    connection = async (url) => {
        try {
            const db = await mongoose.connect(url);
            console.log(`persistence/connected-db: ${db.connection.name}`);
            return db;
        } catch (error) {
            console.log(`Failed connection to persistence-db: ${error}`);
        }
    };

    save = async (entity, data) => await this.models[entity].create(data);

    saveMany = async (entity, data) =>
        await this.models[entity].insertMany(data);

    getBy = async (entity, data) => await this.models[entity].findOne(data);

    getAll = async (entity, proyection) =>
        await this.models[entity].find({}, proyection);

    getAllBy = async (entity, data) =>
        await this.models[entity].aggregate([{ $match: data }]);

    getAllSort = async (entity, sort) =>
        await this.models[entity].aggregate([{ $sort: sort }]);

    getByGenreAndOrder = async (entity, data, sort) =>
        await this.models[entity].aggregate([
            { $match: data },
            { $sort: sort }
        ]);

    getById = async (entity, id) => await this.models[entity].findById(id);

    updateById = async (entity, id, data) =>
        await this.models[entity].findByIdAndUpdate(id, data);

    deleteById = async (entity, id) =>
        await this.models[entity].findByIdAndDelete(id);
}
