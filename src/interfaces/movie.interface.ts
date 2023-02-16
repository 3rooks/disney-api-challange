interface IMovieCharacters {
    character: string;
}

export interface IMovie {
    _id?: string;
    title: string;
    image: string;
    rated: number;
    releaseYear: number;
    characters?: IMovieCharacters[];
    createdAt?: Date;
    updatedAt?: Date;
}
