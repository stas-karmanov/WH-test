import { KeyStore } from './KeyStore';
import { Cipher, CipherSerializer } from './CipherSerializer';

export class EncryptionService {
  private readonly encoder: TextEncoder = new TextEncoder();
  private readonly decoder: TextDecoder = new TextDecoder();

  constructor(private readonly keyStore: KeyStore, private readonly cipherSerializer: CipherSerializer) {}

  async encrypt(data: string): Promise<string> {
    const key: CryptoKey = await this.keyStore.getKey();
    const encodedData: Uint8Array = this.encoder.encode(data);
    const iv: Uint8Array = await this.generateIv();
    const cipher: ArrayBuffer = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, encodedData);
    return this.cipherSerializer.serialize({ cipher, iv });
  }

  async decrypt(data: string): Promise<string> {
    const key: CryptoKey = await this.keyStore.getKey();
    const { cipher, iv }: Cipher = this.cipherSerializer.deserialize(data);
    const encodedData: ArrayBuffer = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, cipher);
    return this.decoder.decode(encodedData);
  }

  private async generateIv(): Promise<Uint8Array> {
    const array: Uint8Array = new Uint8Array(16);
    return crypto.getRandomValues(array);
  }
}
