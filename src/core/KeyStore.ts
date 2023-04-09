import { KeyRepositoryPort } from './ports/KeyRepositoryPort';

export class KeyStore {
  constructor(private readonly keyRepository: KeyRepositoryPort) {}

  async getKey(): Promise<CryptoKey> {
    const storedKey: CryptoKey | null = await this.loadKey();
    return storedKey ?? (await this.generateAndStore());
  }

  private async loadKey(): Promise<CryptoKey | null> {
    try {
      return await this.keyRepository.find();
    } catch {
      return null;
    }
  }

  private async generateAndStore(): Promise<CryptoKey> {
    const key: CryptoKey = await crypto.subtle.generateKey(
      {
        name: 'AES-CBC',
        length: 256,
      },
      false,
      ['encrypt', 'decrypt'],
    );

    await this.keyRepository.save(key);
    return key;
  }
}
