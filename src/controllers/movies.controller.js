import { movieService } from '#services/repository.service.js';

export const moviesCtrl = async (req, res, next) => {
    const { title, genre, order, both } = req;

    if (order) await movieService.getMoviesByTitleAsc();

    if (title) await movieService.getMoviesByTitle(title);

    if (genre) await movieService.getMoviesByGenre(genre);

    // if (order) await movieService

    console.log('CTRL', title, genre, order, both);
    res.send('response');
};
