import { Decoded, Encoder } from '../interfaces';
import { Singleton } from '../utils';
import { NumberEncoder } from './number-encoder';

/**
 * Options to configure encoding an date object.
 */
export interface DateEncodingOptions {
  /**
   * Number of bits to use to encode an date.
   */
  numBits: number;
}

/**
 * Handles encoding/decoding of date objects.
 */
export class DateEncoder implements Encoder<Date, DateEncodingOptions, never> {

  /**
   * Encodes a date to a binary string representation.
   *
   * @param value date to encode
   * @param options configure encoding
   */
  public encode(value: Date, { numBits }: DateEncodingOptions): string {
    const int = Math.round(value.getTime() / 100);
    return Singleton.of(NumberEncoder).encode(int, { numBits });
  }

  /**
   * Decodes a binary string to an date object.
   *
   * @param value binary string to decode to an date.
   */
  public decode(value: string): Decoded<Date> {
    const { numBits, decoded } = Singleton.of(NumberEncoder).decode(value);
    return {
      numBits,
      decoded: new Date(decoded * 100),
    }
  }
}
