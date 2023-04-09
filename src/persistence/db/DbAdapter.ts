import { Utils } from './Utils';

export class DbAdapter {
  private db$: Promise<IDBDatabase> | null = null;

  async connect(dbName: string, stores: string[]): Promise<void> {
    if (this.db$) return;

    const { promise$, resolve, reject } = Utils.getExtractedPromise<IDBDatabase>();
    this.db$ = promise$;

    const openRequest: IDBOpenDBRequest = indexedDB.open(dbName, 1);
    openRequest.onupgradeneeded = () => this.createStores(openRequest.result, stores);
    openRequest.onsuccess = () => resolve(openRequest.result);
    openRequest.onerror = () => reject(openRequest.error);
  }

  async set<T = unknown>(store: string, key: string, value: T): Promise<void> {
    const db: IDBDatabase = await this.getDb();
    const transaction: IDBTransaction = db.transaction(store, 'readwrite');
    const storeObject: IDBObjectStore = transaction.objectStore(store);
    const request: IDBRequest = storeObject.put(value, key);

    const { promise$, resolve, reject } = Utils.getExtractedPromise<void>();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);

    return promise$;
  }

  async get<T = unknown>(store: string, key: string): Promise<T> {
    const db: IDBDatabase = await this.getDb();
    const transaction: IDBTransaction = db.transaction(store, 'readonly');
    const storeObject: IDBObjectStore = transaction.objectStore(store);
    const request: IDBRequest<T> = storeObject.get(key);

    const { promise$, resolve, reject } = Utils.getExtractedPromise<T>();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);

    return promise$;
  }

  async delete(store: string, key: string): Promise<void> {
    const db: IDBDatabase = await this.getDb();
    const transaction: IDBTransaction = db.transaction(store, 'readwrite');
    const storeObject: IDBObjectStore = transaction.objectStore(store);
    const request: IDBRequest = storeObject.delete(key);

    const { promise$, resolve, reject } = Utils.getExtractedPromise<void>();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);

    return promise$;
  }

  private async getDb(): Promise<IDBDatabase> {
    if (!this.db$) {
      throw new Error('Db is not connected');
    }
    return this.db$;
  }

  private createStores(db: IDBDatabase, stores: string[]): void {
    for (const store of stores) {
      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store);
      }
    }
  }
}
