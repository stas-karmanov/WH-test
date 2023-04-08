import { UserEntity } from './entities/UserEntity';
import { HashService } from './HashService';
import { UserRepositoryPort } from './ports/UserRepositoryPort';

export class AuthService {
  constructor(private readonly hashService: HashService, private readonly userRepository: UserRepositoryPort) {}

  async register(password: string, secret: string): Promise<UserEntity> {
    const hashedPassword: string = await this.hashService.hash(password);
    const user: UserEntity = new UserEntity(hashedPassword, secret);
    await this.userRepository.save(user);
    return user;
  }

  async login(password: string): Promise<UserEntity> {
    const user: UserEntity = await this.findUser();
    await this.checkPassword(user, password);
    return user;
  }

  private async findUser(): Promise<UserEntity> {
    const user: UserEntity | null = await this.userRepository.find();
    if (!user) throw new Error('User not found');
    return user;
  }

  private async checkPassword(user: UserEntity, password: string): Promise<void> {
    if (!(await this.hashService.compare(user.getPassword(), password))) {
      throw new Error('Wrong password');
    }
  }
}
