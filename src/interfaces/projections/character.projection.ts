export interface excludeCharacterProjection {
    age: number;
    history: number;
    movies: number;
    createdAt: number;
    updatedAt: number;
}

export const characterProjection: excludeCharacterProjection = {
    age: 0,
    history: 0,
    movies: 0,
    createdAt: 0,
    updatedAt: 0
};
