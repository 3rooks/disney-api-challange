import { Register } from './register.interface';

export type Login = Omit<Register, 'username'>;
