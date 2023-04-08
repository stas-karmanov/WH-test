import { UserEntity } from '../entities/UserEntity';

export interface ApplicationPort {
  register(): Promise<UserEntity>;
  login(password: string): Promise<UserEntity>;
  initializeSecret(): Promise<string>;
  initializeUser(password: string): Promise<void>;
}
