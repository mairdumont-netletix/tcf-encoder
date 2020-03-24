import { Decoded, Encoder } from '../interfaces';

/**
 * Handles encoding/decoding of boolean values.
 */
export class BooleanEncoder implements Encoder<boolean, never, never> {

  /**
   * Encodes a boolean true/false to 0/1 bit string representation.
   *
   * @param value boolean to encode
   */
  public encode(value: boolean): string {
    return +value + '';
  }

  /**
   * Decodes a 0/1 bit string to an boolean.
   *
   * @param value 0/1 bit string to decode
   */
  public decode(value: string): Decoded<boolean> {
    if (!/^[01]{1}$/.test(value)) {
      throw new Error(`invalid bit string: ${value}`);
    }
    return {
      numBits: 1,
      decoded: value === '1'
    };
  }
}
