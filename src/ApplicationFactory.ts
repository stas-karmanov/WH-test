import { ApplicationPort } from './core/ports/ApplicationPort';
import { StorageService } from './persistence/StorageService';
import { UserMapper } from './persistence/UserMapper';
import { UserRepository } from './persistence/UserRepository';
import { UserRepositoryPort } from './core/ports/UserRepositoryPort';
import { HashService } from './core/HashService';
import { SecretService } from './core/SecretService';
import { AuthService } from './core/AuthService';
import { ApplicationFacade } from './core/ApplicationFacade';

export class ApplicationFactory {
  static create(): ApplicationPort {
    const storageService: StorageService = new StorageService();
    const userMapper: UserMapper = new UserMapper();
    const userRepository: UserRepositoryPort = new UserRepository(storageService, userMapper);

    const hashService: HashService = new HashService();
    const secretService: SecretService = new SecretService();
    const authService: AuthService = new AuthService(hashService, userRepository);

    return new ApplicationFacade(authService, secretService);
  }
}
