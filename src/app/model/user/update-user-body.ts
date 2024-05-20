import { User } from './user';

export type UpdateUserBody = Partial<Pick<User, 'email' | 'name'>>;
