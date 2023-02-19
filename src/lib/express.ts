import randomRoute from '@routes/random.routes';
import { Routes } from '@routes/routes';
import { PUBLIC_PATH } from '@utils/paths';
import express, { Express, NextFunction, Request, Response } from 'express';

export class ExpressApplication {
    private base = '/api/v1';

    constructor(readonly application: Express, private routes: Routes) {
        this.init();
    }

    private init = () => {
        this.application.use(express.json());
        this.application.use(express.urlencoded({ extended: true }));
        this.application.use(express.static(PUBLIC_PATH));

        this.application.use(this.base, this.routes.users.router);
        this.application.use(this.base, this.routes.movies.router);
        this.application.use(this.base, this.routes.genders.router);
        this.application.use(this.base, this.routes.characters.router);
        this.application.use('/api/v1/random', randomRoute);

        this.application.use(
            (err: Error, _: Request, res: Response, __: NextFunction) => {
                console.log(err.stack);
                res.status(500).json({ errors: err.message });
            }
        );
    };
}
