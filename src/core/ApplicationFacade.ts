import { ApplicationPort } from './ports/ApplicationPort';
import { UserEntity } from './UserEntity';
import { AuthService } from './AuthService';
import { InitializationService } from './InitializationService';
import { UserMapper } from './UserMapper';
import { UserDto } from './UserDto';
import { UserRepositoryPort } from './ports/UserRepositoryPort';
import { SecretGenerator } from './SecretGenerator';
import { EncryptionService } from './EncryptionService';

export class ApplicationFacade implements ApplicationPort {
  constructor(
    private readonly authService: AuthService,
    private readonly initializationService: InitializationService,
    private readonly userRepository: UserRepositoryPort,
    private readonly userMapper: UserMapper,
    private readonly secretGenerator: SecretGenerator,
    private readonly encryptionService: EncryptionService,
  ) {}

  async register(): Promise<void> {
    const secret: string = this.initializationService.extractSecret();
    const password: string = this.initializationService.extractUserPassword();
    const res = await this.encryptionService.encrypt(password);
    await this.authService.register(password, secret);
  }

  async login(password: string): Promise<void> {
    await this.authService.login(password);
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  async reset(): Promise<void> {
    await this.userRepository.delete();
  }

  async regenerateSecret(): Promise<void> {
    await this.authService.checkAuthentication();
    const user: UserEntity = await this.userRepository.find();
    user.updateSecret(this.secretGenerator.generate());
    await this.userRepository.save(user);
  }

  async getCurrentUser(): Promise<UserDto> {
    await this.authService.checkAuthentication();
    const user: UserEntity = await this.userRepository.find();
    return this.userMapper.toDto(user);
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
