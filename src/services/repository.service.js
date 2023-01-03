import { MongoDataBase } from '#db/database.js';
import { CharacterRepository } from '#repositories/characters.repository.js';
import { GendersRepository } from '#repositories/genders.repository.js';
import { MoviesRepository } from '#repositories/movies.repository.js';
import { UserRepository } from '#repositories/users.repository.js';

const MONGO_URI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOSTNAME}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE_NAME}?authSource=admin`;

const mongoService = new MongoDataBase(MONGO_URI);

export const userService = new UserRepository(mongoService);
export const movieService = new MoviesRepository(mongoService);
export const genderService = new GendersRepository(mongoService);
export const characterService = new CharacterRepository(mongoService);
