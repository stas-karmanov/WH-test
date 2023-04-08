import { UserEntity } from './UserEntity';
import { HashService } from './HashService';
import { UserRepositoryPort } from './ports/UserRepositoryPort';
import { SessionRepositoryPort } from './ports/SessionRepositoryPort';

export class AuthService {
  constructor(
    private readonly hashService: HashService,
    private readonly userRepository: UserRepositoryPort,
    private readonly sessionRepository: SessionRepositoryPort,
  ) {}

  async register(password: string, secret: string): Promise<UserEntity> {
    const hashedPassword: string = await this.hashService.hash(password);
    const user: UserEntity = new UserEntity(hashedPassword, secret);
    await this.userRepository.save(user);
    await this.sessionRepository.create();
    return user;
  }

  async login(password: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.find();
    await this.checkPassword(user, password);
    await this.sessionRepository.create();
    return user;
  }

  async isAuthenticated(): Promise<boolean> {
    return this.sessionRepository.has();
  }

  private async checkPassword(user: UserEntity, password: string): Promise<void> {
    if (!(await this.hashService.compare(user.getPassword(), password))) {
      throw new Error('Wrong password');
    }
  }
}
