import '#config/env.js';
import httpServer from '#config/http.js';

const bootstrap = () => {
    httpServer.listen(process.env.PORT || 8080, () => {
        console.log('listening on port ' + 8080);
    });
};

bootstrap();
