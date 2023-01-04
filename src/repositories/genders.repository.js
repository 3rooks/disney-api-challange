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
        await this.repository.updatedById(this.entity, id, gender);
}
