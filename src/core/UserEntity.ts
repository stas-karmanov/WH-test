export class UserEntity {
  private readonly password: string;
  private secret: string;

  constructor(password: string, secret: string) {
    this.password = password;
    this.secret = secret;
  }

  updateSecret(newSecret: string): void {
    this.secret = newSecret;
  }

  getPassword(): string {
    return this.password;
  }

  getSecret(): string {
    return this.secret;
  }
}
