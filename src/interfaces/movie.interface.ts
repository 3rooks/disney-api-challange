export interface IMovie {
    _id?: string;
    title: string;
    image: string;
    rated: number;
    releaseYear: number;
    characters?: { character: string }[];
}
