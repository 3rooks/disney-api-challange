import { createServer } from 'http';
import application from '../lib/express';

const httpServer = createServer(application);

export default httpServer;
