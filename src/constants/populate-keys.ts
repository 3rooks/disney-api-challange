interface Populate {
    key: RegExp;
    movies: string;
    characters: string;
}

export const POPULATE_KEYS: Populate = {
    key: /(findOne)/g,
    movies: 'movies.movie',
    characters: 'characters.character'
};
