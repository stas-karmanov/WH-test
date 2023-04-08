import { UserEntity } from '../UserEntity';
import { UserDto } from '../UserDto';

export interface ApplicationPort {
  register(): Promise<UserEntity>;
  login(password: string): Promise<UserEntity>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<UserDto>;
  regenerateSecret(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  isInitialized(): Promise<boolean>;
  initializeSecret(): Promise<string>;
  initializeUser(password: string): Promise<void>;
}
