import { ENTITIES } from '#constants/entities.js';

export class CharacterRepository {
    constructor(persistence) {
        this.entity = ENTITIES.CHARACTERS;
        this.repository = persistence;
    }

    createCharacter = async (character) =>
        await this.repository.save(this.entity, character);

    getAllCharacters = async () => await this.repository.getAll(this.entity);
}
