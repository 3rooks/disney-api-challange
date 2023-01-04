import { ENTITIES } from '#constants/entities.js';

export class UsersRepository {
    constructor(persistence) {
        this.entity = ENTITIES.USERS;
        this.persistence = persistence;
    }

    getUserById = async (id) => await this.persistence.getById(this.entity, id);

    registerUser = async (user) =>
        await this.persistence.save(this.entity, user);

    getUserByEmail = async (email) =>
        await this.persistence.getBy(this.entity, { email });

    deleteUserById = async (id) =>
        await this.persistence.deleteById(this.entity, id);

    updateUserById = async (id, user) => {};
}
