import { ApplicationPort } from './core/ports/ApplicationPort';
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
import { DbAdapter } from './persistence/db/DbAdapter';
import { KeyRepository } from './persistence/KeyRepository';
import { KeyRepositoryPort } from './core/ports/KeyRepositoryPort';
import { EncryptionService } from './core/EncryptionService';
import { KeyStore } from './core/KeyStore';

export class ApplicationFactory {
  static create(): ApplicationPort {
    const dbAdapter: DbAdapter = this.createDbAdapter();
    const userPersistenceMapper: UserPersistenceMapper = new UserPersistenceMapper();
    const userRepository: UserRepositoryPort = new UserRepository(dbAdapter, userPersistenceMapper);
    const sessionRepository: SessionRepositoryPort = new SessionRepository(dbAdapter);
    const keyRepository: KeyRepositoryPort = new KeyRepository(dbAdapter);

    const cacheService: CacheService = new CacheService();
    const secretGenerator: SecretGenerator = new SecretGenerator();
    const hashService: HashService = new HashService();
    const initializationService: InitializationService = new InitializationService(secretGenerator, cacheService, userRepository);
    const authService: AuthService = new AuthService(hashService, userRepository, sessionRepository);
    const userMapper: UserMapper = new UserMapper();
    const keyStore: KeyStore = new KeyStore(keyRepository);
    const encryptionService: EncryptionService = new EncryptionService(keyStore);

    return new ApplicationFacade(authService, initializationService, userRepository, userMapper, secretGenerator, encryptionService);
  }

  private static createDbAdapter(): DbAdapter {
    const dbAdapter: DbAdapter = new DbAdapter();
    dbAdapter.connect('wh-test', [UserRepository.Store, SessionRepository.Store, KeyRepository.Store]);
    return dbAdapter;
  }
}
