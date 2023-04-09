import { UserDto } from '../UserDto';

export interface ApplicationPort {
  register(): Promise<void>;
  login(password: string): Promise<void>;
  logout(): Promise<void>;
  reset(): Promise<void>;
  getCurrentUser(): Promise<UserDto>;
  regenerateSecret(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  isInitialized(): Promise<boolean>;
  initializeSecret(): Promise<string>;
  initializeUser(password: string): Promise<void>;
}
