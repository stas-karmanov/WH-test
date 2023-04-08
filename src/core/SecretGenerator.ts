export class SecretGenerator {
  private readonly secretLength: number = 32;
  private readonly alphabet: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  generate(): string {
    let secret = '';

    for (let i = 0; i < this.secretLength; i++) {
      const index = Math.floor(Math.random() * this.alphabet.length);
      secret += this.alphabet[index];
    }

    return secret;
  }
}
