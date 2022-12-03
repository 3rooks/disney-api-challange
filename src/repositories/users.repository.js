import { ENTITIES } from '#constants/entities.js';

export class UserRepository {
    constructor() {
        this.entity = ENTITIES.USERS;
    }

    registerUser = async () => {};

    getUserById = async (id) => {};

    getUserByEmail = async (email) => {};

    updateUserById = async (id, user) => {};

    deleteUserById = async (id) => {};
}
