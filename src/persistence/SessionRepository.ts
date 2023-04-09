import { SessionRepositoryPort } from '../core/ports/SessionRepositoryPort';
import { DbAdapter } from './db/DbAdapter';

export class SessionRepository implements SessionRepositoryPort {
  static readonly Store: string = 'session';
  private readonly sessionKey: string = 'session';

  constructor(private readonly dbAdapter: DbAdapter) {}

  async create(): Promise<void> {
    await this.dbAdapter.set(SessionRepository.Store, this.sessionKey, {});
  }

  async has(): Promise<boolean> {
    const session: unknown = await this.dbAdapter.get(SessionRepository.Store, this.sessionKey);
    return !!session;
  }

  async delete(): Promise<void> {
    await this.dbAdapter.delete(SessionRepository.Store, this.sessionKey);
  }
}
