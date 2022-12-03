import application from '#config/express.js';
import { createServer } from 'http';

const httpServer = createServer(application);

export default httpServer;
