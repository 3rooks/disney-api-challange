import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { IGender } from '@interfaces/gender.interface';
import { ID } from '@interfaces/id.type';
import { excludeGenderProjection } from '@interfaces/projections/gender.projection';
import { LeanDocument, NullExpression } from 'mongoose';

interface GetByName {
    name: string;
}
export class GendersRepository {
    private readonly entity = ENTITIES.GENDERS;

    constructor(private persistence: MongoDataBase) {}

    public createGender = async (
        gender: IGender
    ): Promise<IGender | NullExpression> =>
        await this.persistence.save(this.entity, gender);

    public createManyGenders = async (
        data: IGender[]
    ): Promise<IGender[] | NullExpression> =>
        await this.persistence.saveMany(this.entity, data);

    public getGenderBy = async (
        getBy: GetByName
    ): Promise<LeanDocument<IGender> | NullExpression> =>
        await this.persistence.getBy(this.entity, getBy);

    public getGenderById = async (
        id: ID
    ): Promise<LeanDocument<IGender> | NullExpression> =>
        await this.persistence.getById(this.entity, id);

    public getAllGenders = async (
        projection: excludeGenderProjection
    ): Promise<LeanDocument<IGender>[] | NullExpression> =>
        await this.persistence.getAll(this.entity, projection);

    public updatedGenderById = async (
        id: ID,
        gender: IGender
    ): Promise<LeanDocument<IGender> | NullExpression> =>
        await this.persistence.updateById(this.entity, id, gender);

    public deleteGenderById = async (
        id: ID
    ): Promise<LeanDocument<IGender> | NullExpression> =>
        await this.persistence.deleteById(this.entity, id);
}
