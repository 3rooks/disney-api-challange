import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { ID } from '@interfaces/id.type';
import { IUser } from '@interfaces/user.interface';
import { LeanDocument, NullExpression } from 'mongoose';

export class UsersRepository {
    readonly entity = ENTITIES.USERS;

    constructor(private persistence: MongoDataBase) {}

    public registerUser = async (
        user: IUser
    ): Promise<IUser | NullExpression> =>
        await this.persistence.save(this.entity, user);

    public getUserById = async (
        id: ID
    ): Promise<LeanDocument<IUser> | NullExpression> =>
        await this.persistence.getById(this.entity, id);

    public getUserBy = async (
        getBy: GetUserByEmail
    ): Promise<LeanDocument<IUser> | NullExpression> =>
        await this.persistence.getBy(this.entity, getBy);

    public deleteUserById = async (
        id: ID
    ): Promise<LeanDocument<IUser> | NullExpression> =>
        await this.persistence.deleteById(this.entity, id);

    public updateUserById = async (
        id: ID,
        user: IUser
    ): Promise<LeanDocument<IUser> | NullExpression> =>
        await this.persistence.updateById(this.entity, id, user);
}

interface GetUserByEmail {
    email: string;
}
