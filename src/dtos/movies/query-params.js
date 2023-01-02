export const validateQuery = (req, res, next) => {
    const { title, genre, order } = req.query;

    if (!title && !genre && !order)
        return res.status(400).json({ errors: 'bad request 1' });

    if ((title && genre) || (title && order))
        return res.status(400).json({ errors: 'bad request 2' });

    if (order && genre) {
        req.both = { genre, order };
    } else if (title) {
        req.name = title;
    } else if (genre) {
        req.genre = genre;
    } else {
        req.order = order;
    }

    next();
};
