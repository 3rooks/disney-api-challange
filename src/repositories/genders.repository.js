import { ENTITIES } from '#constants/entities.js';

export class GendersRepository {
    constructor(persistence) {
        this.entity = ENTITIES.GENDERS;
        this.repository = persistence;
    }

    getGenderById = async (id) =>
        await this.repository.getById(this.entity, id);

    getAllGenders = async () => await this.repository.getAll(this.entity);

    createGender = async (gender) =>
        await this.repository.save(this.entity, gender);

    deleteGenderById = async (id) =>
        await this.repository.deleteById(this.entity, id);

    updatedGenderById = async (id, gender) =>
        await this.repository.updateById(this.entity, id, gender);

    createManyGenders = async (data) =>
        await this.repository.saveMany(this.entity, data);

    getGenderBy = async (getBy) =>
        await this.repository.getBy(this.entity, getBy);
}
