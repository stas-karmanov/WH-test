import { UserRepositoryPort } from '../core/ports/UserRepositoryPort';
import { StorageService } from './StorageService';
import { UserEntity } from '../core/entities/UserEntity';
import { UserSchema } from './schemas/UserSchema';
import { UserMapper } from './UserMapper';

export class UserRepository implements UserRepositoryPort {
  private readonly userKey: string = 'user';

  constructor(private readonly storageService: StorageService, private readonly userMapper: UserMapper) {}

  async save(user: UserEntity): Promise<void> {
    const persistence: UserSchema = this.userMapper.toPersistence(user);
    this.storageService.set(this.userKey, persistence);
  }

  async find(): Promise<UserEntity | null> {
    const persistence: UserSchema | null = this.storageService.get<UserSchema>(this.userKey);
    return persistence ? this.userMapper.toDomain(persistence) : null;
  }
}
