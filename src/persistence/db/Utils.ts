export interface ExtractedPromise<T = unknown> {
  promise$: Promise<T>;
  resolve: (value: T) => void;
  reject: (error?: Error | null) => void;
}

export class Utils {
  static getExtractedPromise<T = unknown>(): ExtractedPromise<T> {
    let resolve: (value: T) => void = (_: T) => {};
    let reject: (error?: Error | null) => void = () => {};

    const promise$ = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return { promise$, reject, resolve };
  }
}
