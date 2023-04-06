import { ApplicationPort } from './ports/ApplicationPort';
import { UserEntity } from './entities/UserEntity';
import { AuthService } from './AuthService';

export class ApplicationFacade implements ApplicationPort {
  constructor(private readonly authService: AuthService) {}

  async register(password: string): Promise<UserEntity> {
    const secret = 'awdkqwjdmoqwdo132';
    return this.authService.register(password, secret);
  }

  async login(password: string): Promise<UserEntity> {
    return this.authService.login(password);
  }
}
