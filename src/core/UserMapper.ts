import { UserEntity } from './UserEntity';
import { UserDto } from './UserDto';
import { EncryptionService } from './encryption/EncryptionService';

export class UserMapper {
  constructor(private readonly encryptionService: EncryptionService) {}

  async toDto(entity: UserEntity): Promise<UserDto> {
    const encryptedSecret: string = entity.getSecret();
    const secret: string = await this.encryptionService.decrypt(encryptedSecret);
    return { secret };
  }
}
