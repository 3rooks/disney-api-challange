export interface ICharacter {
    _id?: string;
    name: string;
    image: string;
    age: number;
    history: string;
    movies?: { movie: string }[];
}
