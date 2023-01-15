import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';

export class GendersRepository {
    readonly entity: string = ENTITIES.GENDERS;

    constructor(private persistence: MongoDataBase) {}

    getGenderById = async (id: string) =>
        await this.persistence.getById(this.entity, id);

    getAllGenders = async () =>
        await this.persistence.getAll(this.entity, null);

    createGender = async (gender: object) =>
        await this.persistence.save(this.entity, gender);

    deleteGenderById = async (id: string) =>
        await this.persistence.deleteById(this.entity, id);

    updatedGenderById = async (id: string, gender: object) =>
        await this.persistence.updateById(this.entity, id, gender);

    createManyGenders = async (data: object) =>
        await this.persistence.saveMany(this.entity, data);

    getGenderBy = async (getBy: object) =>
        await this.persistence.getBy(this.entity, getBy);
}
