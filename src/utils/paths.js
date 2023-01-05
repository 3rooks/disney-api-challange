import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const PUBLIC_PATH = resolve(__dirname, '../public');
export const GENDER_PATH = resolve(__dirname, '../public/genders.example.json');
