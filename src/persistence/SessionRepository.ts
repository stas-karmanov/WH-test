import { StorageService } from './StorageService';
import { SessionRepositoryPort } from '../core/ports/SessionRepositoryPort';

export class SessionRepository implements SessionRepositoryPort {
  private readonly sessionKey: string = 'session';

  constructor(private readonly storageService: StorageService) {}

  async create(): Promise<void> {
    this.storageService.set(this.sessionKey, {});
  }

  async has(): Promise<boolean> {
    return !!this.storageService.get(this.sessionKey);
  }

  async delete(): Promise<void> {
    this.storageService.delete(this.sessionKey);
  }
}
