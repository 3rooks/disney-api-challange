import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { ID } from '@interfaces/id.type';
import { IUser } from '@interfaces/user.interface';

export class UsersRepository {
    readonly entity = ENTITIES.USERS;

    constructor(private persistence: MongoDataBase) {}

    getUserById = async (id: ID): Promise<IUser | null> =>
        await this.persistence.getById(this.entity, id);

    registerUser = async (user: IUser): Promise<IUser | null> =>
        await this.persistence.save(this.entity, user);

    getUserBy = async (getBy: GetUserByEmail): Promise<IUser | null> =>
        await this.persistence.getBy(this.entity, getBy);

    deleteUserById = async (id: ID): Promise<IUser | null> =>
        await this.persistence.deleteById(this.entity, id);

    updateUserById = async (id: ID, user: IUser): Promise<IUser | null> =>
        await this.persistence.updateById(this.entity, id, user);
}

interface GetUserByEmail {
    email: string;
}
