export interface SessionRepositoryPort {
  create(): Promise<void>;
  has(): Promise<boolean>;
  delete(): Promise<void>;
}
