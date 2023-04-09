import { UserRepositoryPort } from '../core/ports/UserRepositoryPort';
import { StorageService } from './StorageService';
import { UserEntity } from '../core/UserEntity';
import { UserSchema } from './UserSchema';
import { UserPersistenceMapper } from './UserPersistenceMapper';

export class UserRepository implements UserRepositoryPort {
  private readonly userKey: string = 'user';

  constructor(private readonly storageService: StorageService, private readonly userMapper: UserPersistenceMapper) {}

  async save(user: UserEntity): Promise<void> {
    const persistence: UserSchema = this.userMapper.toPersistence(user);
    this.storageService.set(this.userKey, persistence);
  }

  async find(): Promise<UserEntity> {
    const persistence: UserSchema | null = this.storageService.get<UserSchema>(this.userKey);
    if (!persistence) throw new Error('User not found');
    return this.userMapper.toDomain(persistence);
  }

  async delete(): Promise<void> {
    this.storageService.delete(this.userKey);
  }
}
