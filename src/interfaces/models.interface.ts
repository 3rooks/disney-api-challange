import { Model, Models } from 'mongoose';

export interface ModelEntities<IUser, IMovie, IGender, ICharacter>
    extends Models {
    Users: Model<IUser>;
    Movies: Model<IMovie>;
    Genders: Model<IGender>;
    Characters: Model<ICharacter>;
}
