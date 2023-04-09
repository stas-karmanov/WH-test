import { DbAdapter } from './db/DbAdapter';
import { KeyRepositoryPort } from '../core/ports/KeyRepositoryPort';

export class KeyRepository implements KeyRepositoryPort {
  static readonly Store: string = 'key';
  private readonly recordKey: string = 'key';

  constructor(private readonly dbAdapter: DbAdapter) {}

  async save(key: CryptoKey): Promise<void> {
    await this.dbAdapter.set(KeyRepository.Store, this.recordKey, key);
  }

  async find(): Promise<CryptoKey> {
    const persistence: CryptoKey | undefined = await this.dbAdapter.get(KeyRepository.Store, this.recordKey);
    if (!persistence) throw new Error('Key not found');
    return persistence;
  }

  async delete(): Promise<void> {
    await this.dbAdapter.delete(KeyRepository.Store, this.recordKey);
  }
}
