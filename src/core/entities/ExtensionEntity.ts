export class ExtensionEntity {
  private initialized: boolean;
  private initializationStep: number;

  constructor(initialized: boolean, initializationStep: number) {
    this.initialized = initialized;
    this.initializationStep = initializationStep;
  }

  completeInitialization(): void {
    this.initialized = true;
  }

  updateInitializationStep(step: number): void {
    this.initializationStep = step;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getInitializationStep(): number {
    return this.initializationStep;
  }
}
