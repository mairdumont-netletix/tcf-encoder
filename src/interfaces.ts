export interface Encoder<T> {
  encode(value: T, numBits?: number): string;
  decode(value: string): T;
}

export interface IdMap<T> {
  [id: number]: T;
}