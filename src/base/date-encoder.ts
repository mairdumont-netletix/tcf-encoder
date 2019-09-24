import { Encoder } from '../encoder';
import { NumberEncoder } from './number-encoder';

export class DateEncoder implements Encoder<Date> {

  private numberEncoder = new NumberEncoder();

  encode(value: Date, numBits: number): string {
    const int = Math.round(value.getTime() / 100);
    return this.numberEncoder.encode(int, numBits);
  }

  decode(value: string): Date {
    const int = this.numberEncoder.decode(value);
    return new Date(int * 100);
  }
}
