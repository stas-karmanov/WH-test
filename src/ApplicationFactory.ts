import { ApplicationPort } from './core/ports/ApplicationPort';
import { UserPersistenceMapper } from './persistence/UserPersistenceMapper';
import { UserRepository } from './persistence/UserRepository';
import { UserRepositoryPort } from './core/ports/UserRepositoryPort';
import { HashService } from './core/encryption/HashService';
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
import { EncryptionService } from './core/encryption/EncryptionService';
import { KeyStore } from './core/encryption/KeyStore';
import { CipherSerializer } from './core/encryption/CipherSerializer';

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
    const initializationService: InitializationService = new InitializationService(
      secretGenerator,
      cacheService,
      userRepository,
      sessionRepository,
      keyRepository,
    );
    const keyStore: KeyStore = new KeyStore(keyRepository);
    const cipherSerializer: CipherSerializer = new CipherSerializer();
    const encryptionService: EncryptionService = new EncryptionService(keyStore, cipherSerializer);
    const authService: AuthService = new AuthService(hashService, userRepository, sessionRepository, encryptionService);
    const userMapper: UserMapper = new UserMapper(encryptionService);

    return new ApplicationFacade(authService, initializationService, userRepository, userMapper, secretGenerator, encryptionService);
  }

  private static createDbAdapter(): DbAdapter {
    const dbAdapter: DbAdapter = new DbAdapter();
    dbAdapter.connect('wh-test', [UserRepository.Store, SessionRepository.Store, KeyRepository.Store]);
    return dbAdapter;
  }
}
