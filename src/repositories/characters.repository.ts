import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';

const projection = {
    name: 1,
    image: 1
};
export class CharactersRepository {
    readonly entity: string = ENTITIES.CHARACTERS;

    constructor(private persistence: MongoDataBase) {}

    createCharacter = async (character: object) =>
        await this.persistence.save(this.entity, character);

    getAllCharacters = async () =>
        await this.persistence.getAll(this.entity, projection);

    getCharacterById = async (id: string) =>
        await this.persistence.getById(this.entity, id);

    deleteCharacterById = async (id: string) =>
        await this.persistence.deleteById(this.entity, id);

    updateCharacterById = async (id: string, character: object) =>
        await this.persistence.updateById(this.entity, id, character);

    createManyCharacters = async (data: object) =>
        await this.persistence.saveMany(this.entity, data);

    getCharacterBy = async (getBy: object) =>
        await this.persistence.getBy(this.entity, getBy);

    getAllCharacterBy = async (getAllBy: object) =>
        await this.persistence.getAllBy(this.entity, getAllBy);
}
