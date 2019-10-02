import { Decoded, Encoder } from '../interfaces';

export class NumberEncoder implements Encoder<number> {

  private static instance: NumberEncoder | null;

  public static getInstance() {
    if (!NumberEncoder.instance) {
      NumberEncoder.instance = new NumberEncoder();
    }
    return NumberEncoder.instance;
  }

  private constructor() { }

  encode(value: number, numBits: number): string {
    let bitString = value.toString(2);
    // check if bitString is encodeable
    if (value < 0) {
      throw new Error(`${value} is a negative number which can not be encoded`);
    }
    if (bitString.length > numBits) {
      throw new Error(`${value} is too large to encode into ${numBits} bits`);
    }
    // pad left the string if not filling all bits
    bitString = bitString.padStart(numBits, '0');
    // return encoded string
    return bitString;
  }

  decode(value: string): Decoded<number> {
    return {
      numBits: value.length,
      decoded: parseInt(value, 2),
    }
  }
}
