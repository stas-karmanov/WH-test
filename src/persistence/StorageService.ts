export class StorageService {
  get<T = unknown>(key: string): T | null {
    const record: string | null = localStorage.getItem(key);
    return record ? this.parseRecord(record) : null;
  }

  set<T = unknown>(key: string, data: T): void {
    const serializedData: string = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }

  private parseRecord<T = unknown>(record: string): T | null {
    try {
      return JSON.parse(record) as T;
    } catch {
      return null;
    }
  }
}
