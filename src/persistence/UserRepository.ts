import { UserRepositoryPort } from '../core/ports/UserRepositoryPort';
import { UserEntity } from '../core/UserEntity';
import { UserSchema } from './UserSchema';
import { UserPersistenceMapper } from './UserPersistenceMapper';
import { DbAdapter } from './db/DbAdapter';

export class UserRepository implements UserRepositoryPort {
  static readonly Store: string = 'user';
  private readonly userKey: string = 'user';

  constructor(private readonly dbAdapter: DbAdapter, private readonly userMapper: UserPersistenceMapper) {}

  async save(user: UserEntity): Promise<void> {
    const persistence: UserSchema = this.userMapper.toPersistence(user);
    await this.dbAdapter.set(UserRepository.Store, this.userKey, persistence);
  }

  async find(): Promise<UserEntity> {
    const persistence: UserSchema | null = await this.dbAdapter.get<UserSchema>(UserRepository.Store, this.userKey);
    if (!persistence) throw new Error('User not found');
    return this.userMapper.toDomain(persistence);
  }

  async delete(): Promise<void> {
    await this.dbAdapter.delete(UserRepository.Store, this.userKey);
  }
}
