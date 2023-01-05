import { ENTITIES } from '#constants/entities.js';

export class CharactersRepository {
    constructor(persistence) {
        this.entity = ENTITIES.CHARACTERS;
        this.repository = persistence;
    }

    createCharacter = async (character) =>
        await this.repository.save(this.entity, character);

    getAllCharacters = async () => await this.repository.getAll(this.entity);

    getCharacterById = async (id) =>
        await this.repository.getById(this.entity, id);

    deleteCharacterById = async (id) =>
        await this.repository.deleteById(this.entity, id);

    updateCharacterById = async (id, character) =>
        await this.repository.updateById(this.entity, id, character);

    createManyCharacters = async (data) =>
        await this.repository.saveMany(this.entity, data);
}
