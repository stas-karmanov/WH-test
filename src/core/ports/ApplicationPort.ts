import { UserEntity } from '../entities/UserEntity';

export interface ApplicationPort {
  register(): Promise<UserEntity>;
  login(password: string): Promise<UserEntity>;
  isAuthenticated(): Promise<boolean>;
  isInitialized(): Promise<boolean>;
  initializeSecret(): Promise<string>;
  initializeUser(password: string): Promise<void>;
}
