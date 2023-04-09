import { KeyStore } from './KeyStore';

export interface EncryptedData {
  cipher: ArrayBuffer;
  iv: Uint8Array;
}

export class EncryptionService {
  private readonly encoder: TextEncoder;
  private readonly decoder: TextDecoder;

  constructor(private readonly keyStore: KeyStore) {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  async encrypt(data: string): Promise<EncryptedData> {
    const key: CryptoKey = await this.keyStore.getKey();
    const encodedData: Uint8Array = this.encoder.encode(data);
    const iv: Uint8Array = await this.generateIv();
    const cipher: ArrayBuffer = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, encodedData);
    return { cipher, iv };
  }

  async decrypt(cipher: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<string> {
    const encodedData: ArrayBuffer = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, cipher);
    return this.decoder.decode(encodedData);
  }

  private async generateIv(): Promise<Uint8Array> {
    const array: Uint8Array = new Uint8Array(16);
    return crypto.getRandomValues(array);
  }
}
