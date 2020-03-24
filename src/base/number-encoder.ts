import { Decoded, Encoder } from '../interfaces';

/**
 * Options to configure encoding of a number.
 */
export interface NumberEncodingOptions {
  numBits: number;
}

/**
 * Handles encoding/decoding of numbers.
 */
export class NumberEncoder implements Encoder<number, NumberEncodingOptions, never> {

  /**
   * Encodes a positive integer value to an binary representation.
   *
   * @param value positive integer value to encode
   * @param options configures encoding of numbers
   */
  public encode(value: number, { numBits }: NumberEncodingOptions): string {
    // check if bitString is encodeable
    if (!Number.isInteger(value) || value < 0) {
      throw new Error(`${value} is not a positive integer`);
    }
    if (!Number.isInteger(numBits) || numBits < 1) {
      throw new Error(`numBits not given (${numBits})`);
    }
    let bitString = value.toString(2);
    if (bitString.length > numBits) {
      throw new Error(`${value} is too large to encode into ${numBits} bits`);
    }
    // pad left the string if not filling all bits
    bitString = bitString.padStart(numBits, '0');
    // return encoded string
    return bitString;
  }

  /**
   * Decodes a binary string into a integer number.
   *
   * @param value binary string to decode
   */
  public decode(value: string): Decoded<number> {
    return {
      numBits: value.length,
      decoded: parseInt(value, 2),
    }
  }
}
