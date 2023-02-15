import authRoute from '@routes/auth.routes';
import charactersRoute from '@routes/characters.routes';
import gendersRoute from '@routes/genders.routes';
import moviesRoute from '@routes/movies.routes';
import randomRoute from '@routes/random.routes';
import usersRoute from '@routes/users.routes';
import { PUBLIC_PATH } from '@utils/paths';
import express, { NextFunction, Request, Response } from 'express';

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(express.static(PUBLIC_PATH));

application.use('/api/v1', authRoute);
application.use('/api/v1', usersRoute);
application.use('/api/v1', moviesRoute);
application.use('/api/v1', gendersRoute);
application.use('/api/v1', charactersRoute);
application.use('/api/v1/random', randomRoute);

application.use((err: Error, _: Request, res: Response, __: NextFunction) => {
    console.log(err.stack);
    res.status(500).json({ errors: err.message });
});

export default application;
