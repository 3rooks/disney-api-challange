export const validateQuery = (req, res, next) => {
    const { name, genre, order } = req.query;

    if (!name && !genre && !order)
        return res.status(400).json({ errors: 'bad request 1' });

    if ((name && genre) || (name && order))
        return res.status(400).json({ errors: 'bad request 2' });

    if (order && genre) {
        req.both = { genre, order };
    } else if (name) {
        req.name = name;
    } else if (genre) {
        req.genre = genre;
    } else {
        req.order = order;
    }

    next();
};
