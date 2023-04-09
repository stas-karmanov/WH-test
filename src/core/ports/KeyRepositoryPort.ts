export interface KeyRepositoryPort {
  save(key: CryptoKey): Promise<void>;
  find(): Promise<CryptoKey>;
  delete(): Promise<void>;
}
