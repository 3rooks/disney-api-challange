import { MongoDataBase } from '@db/database';
import { CharactersRepository } from '@repositories/characters.repository';
import { GendersRepository } from '@repositories/genders.repository';
import { MoviesRepository } from '@repositories/movies.repository';
import { UsersRepository } from '@repositories/users.repository';

const MongoService = new MongoDataBase();

export const UserService = new UsersRepository(MongoService);
export const MovieService = new MoviesRepository(MongoService);
export const GenderService = new GendersRepository(MongoService);
export const CharacterService = new CharactersRepository(MongoService);

export default MongoService;
