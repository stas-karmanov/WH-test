import { UserEntity } from './UserEntity';
import { UserDto } from './UserDto';

export class UserMapper {
  toDto(entity: UserEntity): UserDto {
    const secret: string = entity.getSecret();
    return { secret };
  }
}
