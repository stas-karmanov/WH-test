import { UserEntity } from '../entities/UserEntity';

export interface UserRepositoryPort {
  save(user: UserEntity): void;
  find(): Promise<UserEntity | null>;
}
