import { UserEntity } from '../core/UserEntity';
import { UserSchema } from './UserSchema';

export class UserPersistenceMapper {
  toPersistence(entity: UserEntity): UserSchema {
    return {
      password: entity.getPassword(),
      secret: entity.getSecret(),
    };
  }

  toDomain(persistence: UserSchema): UserEntity {
    return new UserEntity(persistence.password, persistence.secret);
  }
}
