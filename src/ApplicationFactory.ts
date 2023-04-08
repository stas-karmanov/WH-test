import { ApplicationPort } from './core/ports/ApplicationPort';
import { StorageService } from './persistence/StorageService';
import { UserPersistenceMapper } from './persistence/UserPersistenceMapper';
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
import { UserMapper } from './core/UserMapper';

export class ApplicationFactory {
  static create(): ApplicationPort {
    const storageService: StorageService = new StorageService();
    const userPersistenceMapper: UserPersistenceMapper = new UserPersistenceMapper();
    const userRepository: UserRepositoryPort = new UserRepository(storageService, userPersistenceMapper);
    const sessionRepository: SessionRepositoryPort = new SessionRepository(storageService);

    const cacheService: CacheService = new CacheService();
    const secretGenerator: SecretGenerator = new SecretGenerator();
    const hashService: HashService = new HashService();
    const initializationService: InitializationService = new InitializationService(secretGenerator, cacheService, userRepository);
    const authService: AuthService = new AuthService(hashService, userRepository, sessionRepository);
    const userMapper: UserMapper = new UserMapper();

    return new ApplicationFacade(authService, initializationService, userRepository, userMapper, secretGenerator);
  }
}
