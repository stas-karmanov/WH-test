import { UserEntity } from '../entities/UserEntity';

export interface ApplicationPort {
  register(password: string): Promise<UserEntity>;
  login(password: string): Promise<UserEntity>;
  generateSecret(): Promise<string>;
}
