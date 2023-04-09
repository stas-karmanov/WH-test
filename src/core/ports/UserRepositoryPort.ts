import { UserEntity } from '../UserEntity';

export interface UserRepositoryPort {
  save(user: UserEntity): void;
  find(): Promise<UserEntity>;
  delete(): Promise<void>;
}
