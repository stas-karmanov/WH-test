import { UserEntity } from './UserEntity';
import { HashService } from './HashService';
import { UserRepositoryPort } from './ports/UserRepositoryPort';
import { SessionRepositoryPort } from './ports/SessionRepositoryPort';
import { EncryptionService } from './EncryptionService';

export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly userRepository: UserRepositoryPort,
    private readonly sessionRepository: SessionRepositoryPort,
    private readonly encryptionService: EncryptionService,
  ) {}

  async register(password: string, secret: string): Promise<UserEntity> {
    const hashedPassword: string = await this.hashService.hash(password);
    const user: UserEntity = new UserEntity(hashedPassword, secret);
    await this.userRepository.save(user);
    return user;
  }

  async login(password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.find();
    await this.checkPassword(user, password);
    await this.sessionRepository.create();
    return user;
  }

  async logout(): Promise<void> {
    await this.sessionRepository.delete();
  }

  async isAuthenticated(): Promise<boolean> {
    return this.sessionRepository.has();
  }

  async checkAuthentication(): Promise<void> {
    if (!(await this.isAuthenticated())) {
      throw new Error('Not authenticated');
    }
  }

  private async checkPassword(user: UserEntity, password: string): Promise<void> {
    if (!(await this.hashService.compare(user.getPassword(), password))) {
      throw new Error('Wrong password');
    }
  }
}
