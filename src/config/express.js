import charactersRoute from '#routes/characters.routes.js';
import moviesRoute from '#routes/movies.routes.js';
import usersRoute from '#routes/users.routes.js';
import { PUBLIC_PATH } from '#utils/paths.js';
import express from 'express';

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(express.static(PUBLIC_PATH));

application.use('/api/v1', usersRoute);
application.use('/api/v1', moviesRoute);
application.use('/api/v1', charactersRoute);

application.use((err, req, res, next) => {
    res.status(500).json({ errors: err.message });
});

export default application;
