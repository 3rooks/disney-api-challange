import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';

export class UsersRepository {
    readonly entity: string = ENTITIES.USERS;

    constructor(private persistence: MongoDataBase) {}

    getUserById = async (id: string) =>
        await this.persistence.getById(this.entity, id);

    registerUser = async (user: object) =>
        await this.persistence.save(this.entity, user);

    getUserBy = async (getBy: object) =>
        await this.persistence.getBy(this.entity, getBy);

    deleteUserById = async (id: string) =>
        await this.persistence.deleteById(this.entity, id);

    updateUserById = async (id: string, user: object) =>
        await this.persistence.updateById(this.entity, id, user);
}
