import swaggerDoc from '@docs/documentation.json';
import randomRoute from '@routes/random.routes';
import { Routes } from '@routes/routes';
import { PUBLIC_PATH } from '@utils/paths';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import swaggerUiExpress from 'swagger-ui-express';

export class ExpressApplication {
    private base = '/api/v1';

    constructor(readonly app: Application, private routes: Routes) {
        this.init();
    }

    private init = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(PUBLIC_PATH));
        this.app.use(cors());
        this.app.use(
            '/docs',
            swaggerUiExpress.serve,
            swaggerUiExpress.setup(swaggerDoc, {
                customSiteTitle: 'Documentation'
            })
        );

        this.app.use(this.base, this.routes.users.router);
        this.app.use(this.base, this.routes.movies.router);
        this.app.use(this.base, this.routes.genders.router);
        this.app.use(this.base, this.routes.characters.router);
        this.app.use('/api/v1/random', randomRoute);

        this.app.use(
            (err: Error, _: Request, res: Response, __: NextFunction) => {
                console.log(err.stack);
                res.status(500).json({ errors: err.message });
            }
        );
    };
}
