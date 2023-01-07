import { ENTITIES } from '#constants/entities.js';

const projection = {
    name: 1,
    image: 1
};
export class CharactersRepository {
    constructor(persistence) {
        this.entity = ENTITIES.CHARACTERS;
        this.repository = persistence;
    }

    createCharacter = async (character) =>
        await this.repository.save(this.entity, character);

    getAllCharacters = async () =>
        await this.repository.getAll(this.entity, projection);

    getCharacterById = async (id) =>
        await this.repository.getById(this.entity, id);

    deleteCharacterById = async (id) =>
        await this.repository.deleteById(this.entity, id);

    updateCharacterById = async (id, character) =>
        await this.repository.updateById(this.entity, id, character);

    createManyCharacters = async (data) =>
        await this.repository.saveMany(this.entity, data);

    getCharacterByQuery = async (queries) => {
        const { name, age, movie } = queries;

        if (name && !age && !movie) {
            return await this.repository.getBy(this.entity, { name });
        } else if (age && !name && !movie) {
            return await this.repository.getAllBy(this.entity, { age });
        } else if (movie && !name && !age) {
            const { characters } = await this.repository.getById(
                ENTITIES.MOVIES,
                movie
            );
            return characters;
        } else {
            return undefined;
        }
    };
}
