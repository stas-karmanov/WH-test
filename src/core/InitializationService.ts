import { SecretGenerator } from './SecretGenerator';
import { CacheService } from './CacheService';
import { UserRepositoryPort } from './ports/UserRepositoryPort';

export class InitializationService {
  private readonly secretCacheKey: string = 'userSecret';
  private readonly userCacheKey: string = 'userPassword';

  constructor(
    private readonly secretGenerator: SecretGenerator,
    private readonly cacheService: CacheService,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async isApplicationInitialized(): Promise<boolean> {
    try {
      await this.userRepository.find();
      return true;
    } catch {
      return false;
    }
  }

  initializeUser(password: string): void {
    this.cacheService.set(this.userCacheKey, password);
  }

  initializeSecret(): string {
    const secret: string = this.secretGenerator.generate();
    this.cacheService.set(this.secretCacheKey, secret);
    return secret;
  }

  extractSecret(): string {
    const secret: string | null = this.cacheService.get<string>(this.secretCacheKey);
    if (!secret) throw new Error('Secret is not initialized');
    this.cacheService.delete(this.secretCacheKey);
    return secret;
  }

  extractUserPassword(): string {
    const password: string | null = this.cacheService.get<string>(this.userCacheKey);
    if (!password) throw new Error('User is not initialized');
    this.cacheService.delete(this.userCacheKey);
    return password;
  }
}
