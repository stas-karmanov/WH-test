export class HashService {
  async hash(data: string): Promise<string> {
    return data;
  }

  async compare(_hash: string, _data: string): Promise<boolean> {
    return true;
  }
}
