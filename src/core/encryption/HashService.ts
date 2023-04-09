export class HashService {
  private readonly encoder: TextEncoder = new TextEncoder();

  async hash(data: string): Promise<string> {
    const encoded: Uint8Array = this.encoder.encode(data);
    const hash: ArrayBuffer = await crypto.subtle.digest('SHA-256', encoded);

    return Array.from(new Uint8Array(hash))
      .map((item: number) => item.toString(16).padStart(2, '0'))
      .join('');
  }

  async compare(hash: string, data: string): Promise<boolean> {
    const hashedData: string = await this.hash(data);
    return hashedData === hash;
  }
}
