import { MongoDataBase } from '@db/database';
import { CharactersRepository } from '@repositories/characters.repository';
import { GendersRepository } from '@repositories/genders.repository';
import { MoviesRepository } from '@repositories/movies.repository';
import { UsersRepository } from '@repositories/users.repository';

const MONGO_URI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOSTNAME}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE_NAME}?authSource=admin`;

const MONGO_LOCAL: String = 'mongodb://127.0.0.1:27017/disneyapi';

const mongoService = new MongoDataBase(MONGO_LOCAL);

export const userService = new UsersRepository(mongoService);
export const movieService = new MoviesRepository(mongoService);
export const genderService = new GendersRepository(mongoService);
export const characterService = new CharactersRepository(mongoService);
