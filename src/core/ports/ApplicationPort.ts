import { UserEntity } from '../UserEntity';
import { UserDto } from '../UserDto';

export interface ApplicationPort {
  register(): Promise<UserEntity>;
  login(password: string): Promise<UserEntity>;
  getCurrentUser(): Promise<UserDto>;
  isAuthenticated(): Promise<boolean>;
  isInitialized(): Promise<boolean>;
  initializeSecret(): Promise<string>;
  initializeUser(password: string): Promise<void>;
}
