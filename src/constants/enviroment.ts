const localDataBase: string = 'mongodb://127.0.0.1:27017/api';

export const PORT = Number(process.env.PORT) || 8080;
export const URI = process.env.MONGO_URI || localDataBase;
