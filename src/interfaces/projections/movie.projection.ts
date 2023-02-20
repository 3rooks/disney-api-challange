export interface excludeMovieProjection {
    characters: number;
    rated: number;
    genders: number;
    createdAt: number;
    updatedAt: number;
}

export const movieProjection: excludeMovieProjection = {
    characters: 0,
    rated: 0,
    genders: 0,
    updatedAt: 0,
    createdAt: 0
};
