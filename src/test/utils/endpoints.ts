import '@config/env';

export class EndpointsTest {
    private base = `${process.env.LOCAL_HOST}:${process.env.PORT}/api/v1`;

    readonly movies = {
        getAllMovies: () => `${this.base}/movies`,
        getMovieById: (id: string) => `${this.base}/movies/${id}`
    };
}
