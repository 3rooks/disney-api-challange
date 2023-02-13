import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { IGender } from '@interfaces/gender.interface';

export class GendersRepository {
    readonly entity = ENTITIES.GENDERS;

    constructor(private persistence: MongoDataBase) {}

    getGenderById = async (id: string): Promise<IGender | null> =>
        await this.persistence.getById(this.entity, id);

    getAllGenders = async () =>
        await this.persistence.getAll(this.entity, undefined);

    createGender = async (gender: IGender) =>
        await this.persistence.save(this.entity, gender);

    deleteGenderById = async (id: string) =>
        await this.persistence.deleteById(this.entity, id);

    updatedGenderById = async (id: string, gender: IGender) =>
        await this.persistence.updateById(this.entity, id, gender);

    createManyGenders = async (data: IGender[]) =>
        await this.persistence.saveMany(this.entity, data);

    getGenderBy = async (getBy: object) =>
        await this.persistence.getBy(this.entity, getBy);
}
