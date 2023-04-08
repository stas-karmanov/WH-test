export class CacheService {
  private readonly cache = new Map<string, unknown>();

  set<T = unknown>(key: string, value: T): void {
    this.cache.set(key, value);
  }

  get<T = unknown>(key: string): T | null {
    return (this.cache.get(key) as T) ?? null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}
