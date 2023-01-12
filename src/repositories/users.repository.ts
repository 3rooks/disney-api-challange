import { ENTITIES } from "@constants/entities";


export class UsersRepository {
    constructor(persistence) {
        this.entity = ENTITIES.USERS;
        this.repository = persistence;
    }

    getUserById = async (id) => await this.repository.getById(this.entity, id);

    registerUser = async (user) =>
        await this.repository.save(this.entity, user);

    getUserBy = async (getBy) =>
        await this.repository.getBy(this.entity, getBy);

    deleteUserById = async (id) =>
        await this.repository.deleteById(this.entity, id);

    updateUserById = async (id, user) =>
        await this.repository.updateById(this.entity, id, user);
}
