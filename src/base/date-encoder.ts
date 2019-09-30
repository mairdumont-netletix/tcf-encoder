import { Decoded, Encoder } from '../interfaces';
import { NumberEncoder } from './number-encoder';

export class DateEncoder implements Encoder<Date> {

  private numberEncoder = new NumberEncoder();

  encode(value: Date, numBits: number): string {
    const int = Math.round(value.getTime() / 100);
    return this.numberEncoder.encode(int, numBits);
  }

  decode(value: string): Decoded<Date> {
    const { numBits, decoded } = this.numberEncoder.decode(value);
    return {
      numBits,
      decoded: new Date(decoded * 100),
    }
  }
}
