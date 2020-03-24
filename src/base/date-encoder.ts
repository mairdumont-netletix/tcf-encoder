import { Decoded, Encoder } from '../interfaces';
import { Singleton } from '../utils';
import { NumberEncoder } from './number-encoder';

export interface DateEncodingOptions {
  numBits: number;
}

export class DateEncoder implements Encoder<Date, DateEncodingOptions, never> {

  public encode(value: Date, { numBits }: DateEncodingOptions): string {
    const int = Math.round(value.getTime() / 100);
    return Singleton.of(NumberEncoder).encode(int, { numBits });
  }

  public decode(value: string): Decoded<Date> {
    const { numBits, decoded } = Singleton.of(NumberEncoder).decode(value);
    return {
      numBits,
      decoded: new Date(decoded * 100),
    }
  }
}
