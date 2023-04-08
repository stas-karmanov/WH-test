export class SecretService {
  private readonly secretLength: number = 12;

  async generate(): Promise<string> {
    const data = `${Math.random()}${Date.now()}`;
    return data.slice(0, this.secretLength);
  }
}
