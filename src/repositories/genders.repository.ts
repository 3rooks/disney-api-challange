import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { IGender } from '@interfaces/gender.interface';
import { ID } from '@interfaces/id.type';

export class GendersRepository {
    readonly entity = ENTITIES.GENDERS;

    constructor(private persistence: MongoDataBase) {}

    public getGenderById = async (id: ID): Promise<IGender | null> =>
        await this.persistence.getById(this.entity, id);

    public getAllGenders = async (): Promise<IGender[] | null> =>
        await this.persistence.getAll(this.entity, undefined);

    public createGender = async (gender: IGender): Promise<IGender | null> =>
        await this.persistence.save(this.entity, gender);

    public deleteGenderById = async (id: ID): Promise<IGender | null> =>
        await this.persistence.deleteById(this.entity, id);

    public updatedGenderById = async (
        id: ID,
        gender: IGender
    ): Promise<IGender | null> =>
        await this.persistence.updateById(this.entity, id, gender);

    public createManyGenders = async (
        data: IGender[]
    ): Promise<IGender[] | null> =>
        await this.persistence.saveMany(this.entity, data);

    public getGenderBy = async (getBy: object): Promise<IGender | null> =>
        await this.persistence.getBy(this.entity, getBy);
}
