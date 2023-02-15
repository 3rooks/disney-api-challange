import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { ICharacter } from '@interfaces/character.interface';
import { ID } from '@interfaces/id.type';

const excludeProjection = {
    _id: 0,
    age: 0,
    history: 0,
    movies: 0,
    createdAt: 0,
    updatedAt: 0
};
export class CharactersRepository {
    readonly entity = ENTITIES.CHARACTERS;

    constructor(private persistence: MongoDataBase) {}

    public createCharacter = async (
        character: ICharacter
    ): Promise<ICharacter | null> =>
        await this.persistence.save(this.entity, character);

    public getAllCharacters = async (): Promise<ICharacter[] | null> => {
        const a = await this.persistence.getAll(this.entity, excludeProjection);
        const b = a[0].populated('movies');
        console.log(b);
        return a;
    };

    public getCharacterById = async (id: ID): Promise<ICharacter | null> =>
        await this.persistence.getById(this.entity, id);

    public deleteCharacterById = async (id: ID): Promise<ICharacter | null> =>
        await this.persistence.deleteById(this.entity, id);

    public updateCharacterById = async (
        id: ID,
        character: ICharacter
    ): Promise<ICharacter | null> =>
        await this.persistence.updateById(this.entity, id, character);

    public createManyCharacters = async (
        data: ICharacter[]
    ): Promise<ICharacter[] | null> =>
        await this.persistence.saveMany(this.entity, data);

    public getCharacterBy = async (getBy: object): Promise<ICharacter | null> =>
        await this.persistence.getBy(this.entity, getBy);

    public getAllCharacterBy = async (
        getAllBy: object
    ): Promise<ICharacter[] | null> =>
        await this.persistence.getAllBy(this.entity, getAllBy);
}
