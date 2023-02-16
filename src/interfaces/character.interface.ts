interface ICharacterMovie {
    movie: string;
}

export interface ICharacter {
    _id?: string;
    name: string;
    image: string;
    age: number;
    history: string;
    movies?: ICharacterMovie[];
    createdAt?: Date;
    updatedAt?: Date;
}
