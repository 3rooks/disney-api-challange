import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { ICharacter } from '@interfaces/character.interface';
import { ID } from '@interfaces/id.type';

const projection = {
    name: 1,
    image: 1
};
export class CharactersRepository {
    readonly entity = ENTITIES.CHARACTERS;

    constructor(private persistence: MongoDataBase) {}

    createCharacter = async (
        character: ICharacter
    ): Promise<ICharacter | null> =>
        await this.persistence.save(this.entity, character);

    getAllCharacters = async (): Promise<ICharacter[] | null> =>
        await this.persistence.getAll(this.entity, projection);

    getCharacterById = async (id: ID): Promise<ICharacter | null> =>
        await this.persistence.getById(this.entity, id);

    deleteCharacterById = async (id: ID): Promise<ICharacter | null> =>
        await this.persistence.deleteById(this.entity, id);

    updateCharacterById = async (
        id: ID,
        character: ICharacter
    ): Promise<ICharacter | null> =>
        await this.persistence.updateById(this.entity, id, character);

    createManyCharacters = async (
        data: ICharacter[]
    ): Promise<ICharacter[] | null> =>
        await this.persistence.saveMany(this.entity, data);

    getCharacterBy = async (getBy: object): Promise<ICharacter | null> =>
        await this.persistence.getBy(this.entity, getBy);

    getAllCharacterBy = async (
        getAllBy: object
    ): Promise<ICharacter[] | null> =>
        await this.persistence.getAllBy(this.entity, getAllBy);
}
