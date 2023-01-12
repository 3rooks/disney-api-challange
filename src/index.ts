import '@config/env';
import httpServer from '@config/http';

const PORT: number = Number(process.env.PORT) || 8080;

const bootstrap = () => {
    httpServer.listen(PORT, () => {
        console.log(`listening on port: ${PORT}`);
    });
};

bootstrap();
