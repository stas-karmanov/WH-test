import { UserEntity } from '../core/entities/UserEntity';
import { UserSchema } from './schemas/UserSchema';

export class UserMapper {
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
