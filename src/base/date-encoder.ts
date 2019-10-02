import { Decoded, Encoder } from '../interfaces';
import { NumberEncoder } from './number-encoder';

export class DateEncoder implements Encoder<Date> {

  private static instance: DateEncoder | null;

  public static getInstance() {
    if (!DateEncoder.instance) {
      DateEncoder.instance = new DateEncoder();
    }
    return DateEncoder.instance;
  }

  private constructor() { }

  encode(value: Date, numBits: number): string {
    const int = Math.round(value.getTime() / 100);
    return NumberEncoder.getInstance().encode(int, numBits);
  }

  decode(value: string): Decoded<Date> {
    const { numBits, decoded } = NumberEncoder.getInstance().decode(value);
    return {
      numBits,
      decoded: new Date(decoded * 100),
    }
  }
}
