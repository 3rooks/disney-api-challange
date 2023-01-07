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

    getCharacterBy = async (getBy) =>
        await this.repository.getBy(this.entity, getBy);

    getAllCharacterBy = async (getAllBy) =>
        await this.repository.getAllBy(this.entity, getAllBy);
}
