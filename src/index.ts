import '@config/env';
import httpServer from '@config/http';
import { PORT, URI } from '@constants/enviroment';
import MongoService from '@services/repository.service';

const bootstrap = async () => {
    await MongoService.connection(URI);
    httpServer.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
};

bootstrap();
