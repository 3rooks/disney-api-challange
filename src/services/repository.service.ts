import { MongoDataBase } from '@db/database';
import { CharactersRepository } from '@repositories/characters.repository';
import { GendersRepository } from '@repositories/genders.repository';
import { MoviesRepository } from '@repositories/movies.repository';
import { UsersRepository } from '@repositories/users.repository';

export class RepositoryService {
    public users = new UsersRepository(this.persistence);
    public movies = new MoviesRepository(this.persistence);
    public genders = new GendersRepository(this.persistence);
    public characters = new CharactersRepository(this.persistence);

    constructor(readonly persistence: MongoDataBase) {}
}

export const Services = new RepositoryService(new MongoDataBase());
