import { ApplicationPort } from './core/ports/ApplicationPort';
import { StorageService } from './persistence/StorageService';
import { UserMapper } from './persistence/UserMapper';
import { UserRepository } from './persistence/UserRepository';
import { UserRepositoryPort } from './core/ports/UserRepositoryPort';
import { HashService } from './core/HashService';
import { AuthService } from './core/AuthService';
import { ApplicationFacade } from './core/ApplicationFacade';
import { CacheService } from './core/CacheService';
import { SecretGenerator } from './core/SecretGenerator';
import { InitializationService } from './core/InitializationService';
import { SessionRepositoryPort } from './core/ports/SessionRepositoryPort';
import { SessionRepository } from './persistence/SessionRepository';

export class ApplicationFactory {
  static create(): ApplicationPort {
    const storageService: StorageService = new StorageService();
    const userMapper: UserMapper = new UserMapper();
    const userRepository: UserRepositoryPort = new UserRepository(storageService, userMapper);
    const sessionRepository: SessionRepositoryPort = new SessionRepository(storageService);

    const cacheService: CacheService = new CacheService();
    const secretGenerator: SecretGenerator = new SecretGenerator();
    const hashService: HashService = new HashService();
    const initializationService: InitializationService = new InitializationService(secretGenerator, cacheService, userRepository);
    const authService: AuthService = new AuthService(hashService, userRepository, sessionRepository);

    return new ApplicationFacade(authService, initializationService);
  }
}
