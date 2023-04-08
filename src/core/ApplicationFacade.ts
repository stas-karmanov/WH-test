import { ApplicationPort } from './ports/ApplicationPort';
import { UserEntity } from './entities/UserEntity';
import { AuthService } from './AuthService';
import { InitializationService } from './InitializationService';

export class ApplicationFacade implements ApplicationPort {
  constructor(private readonly authService: AuthService, private readonly initializationService: InitializationService) {}

  async register(): Promise<UserEntity> {
    const secret: string = this.initializationService.extractSecret();
    const password: string = this.initializationService.extractUserPassword();
    return this.authService.register(password, secret);
  }

  async login(password: string): Promise<UserEntity> {
    return this.authService.login(password);
  }

  async isAuthenticated(): Promise<boolean> {
    return this.authService.isAuthenticated();
  }

  async isInitialized(): Promise<boolean> {
    return this.initializationService.isApplicationInitialized();
  }

  async initializeUser(password: string): Promise<void> {
    this.initializationService.initializeUser(password);
  }

  async initializeSecret(): Promise<string> {
    return this.initializationService.initializeSecret();
  }
}
