export class HashService {
  async hash(data: string): Promise<string> {
    return data;
  }

  async compare(hash: string, data: string): Promise<boolean> {
    return hash === data;
  }
}
