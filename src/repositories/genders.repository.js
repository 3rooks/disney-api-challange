import { ENTITIES } from '#constants/entities.js';

export class GendersRepository {
    constructor(persistence) {
        this.entity = ENTITIES.GENDERS;
        this.repository = persistence;
    }

    getAllGenders = async () => await this.repository.getAll(this.entity);

    createGender = async (gender) =>
        await this.repository.save(this.entity, gender);
}
