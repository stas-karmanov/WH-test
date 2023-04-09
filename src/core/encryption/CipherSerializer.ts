export interface Cipher {
  cipher: ArrayBuffer;
  iv: ArrayBuffer;
}

interface SerializedCipher {
  cipher: string;
  iv: string;
}

export class CipherSerializer {
  serialize({ cipher, iv }: Cipher): string {
    const serializedCipher: string = this.serializeBuffer(cipher);
    const serializedIv: string = this.serializeBuffer(iv);
    const data: SerializedCipher = { cipher: serializedCipher, iv: serializedIv };
    return JSON.stringify(data);
  }

  deserialize(serialized: string): Cipher {
    const { cipher, iv }: SerializedCipher = this.parseCipher(serialized);
    return { cipher: this.deserializeBuffer(cipher), iv: this.deserializeBuffer(iv) };
  }

  private deserializeBuffer(serialized: string): ArrayBuffer {
    const string = atob(serialized);
    const buffer = new ArrayBuffer(string.length);
    const bufferView = new Uint8Array(buffer);

    for (let i = 0; i < string.length; i++) {
      bufferView[i] = string.charCodeAt(i);
    }

    return buffer;
  }

  private serializeBuffer(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer) as unknown as number[]));
  }

  private parseCipher(serialized: string): SerializedCipher {
    try {
      return JSON.parse(serialized) as SerializedCipher;
    } catch {
      throw new Error('Unable to parse data');
    }
  }
}
