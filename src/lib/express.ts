// import { PUBLIC_PATH } from '#utils/paths';
import charactersRoute from '@routes/characters.routes';
import gendersRoute from '@routes/genders.routes';
import moviesRoute from '@routes/movies.routes';
import randomRoute from '@routes/random.routes';
import usersRoute from '@routes/users.routes';
import express, { Request, Response } from 'express';

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(express.static(__dirname + '../public'));

application.use('/api/v1', usersRoute);
application.use('/api/v1', moviesRoute);
application.use('/api/v1', gendersRoute);
application.use('/api/v1', charactersRoute);
application.use('/api/v1/random', randomRoute);

application.use((err: Error, _: Request, res: Response) => {
    console.log(err.stack);
    res.status(500).json({ errors: err.message });
});

export default application;
