import { ENTITIES } from '@constants/entities';
import { MongoDataBase } from '@db/database';
import { ICharacter } from '@interfaces/character.interface';
import { ID } from '@interfaces/id.type';
import { LeanDocument, NullExpression } from 'mongoose';

export class CharactersRepository {
    readonly entity = ENTITIES.CHARACTERS;

    constructor(private persistence: MongoDataBase) {}

    public createCharacter = async (
        character: ICharacter
    ): Promise<ICharacter | NullExpression> =>
        await this.persistence.save(this.entity, character);

    public createManyCharacters = async (
        data: ICharacter[]
    ): Promise<ICharacter[] | NullExpression> =>
        await this.persistence.saveMany(this.entity, data);

    public getAllCharacters = async (
        projection: object
    ): Promise<LeanDocument<ICharacter>[] | NullExpression> =>
        await this.persistence.getAll(this.entity, projection);

    public getCharacterById = async (
        id: ID
    ): Promise<LeanDocument<ICharacter> | NullExpression> =>
        await this.persistence.getById(this.entity, id);

    public deleteCharacterById = async (
        id: ID
    ): Promise<LeanDocument<ICharacter> | NullExpression> =>
        await this.persistence.deleteById(this.entity, id);

    public updateCharacterById = async (
        id: ID,
        character: ICharacter
    ): Promise<LeanDocument<ICharacter> | NullExpression> =>
        await this.persistence.updateById(this.entity, id, character);

    public getCharacterBy = async (
        getBy: object
    ): Promise<LeanDocument<ICharacter> | NullExpression> =>
        await this.persistence.getBy(this.entity, getBy);

    public getAllCharacterBy = async (
        getAllBy: object
    ): Promise<ICharacter[] | NullExpression> =>
        await this.persistence.getAllBy(this.entity, getAllBy);
}
