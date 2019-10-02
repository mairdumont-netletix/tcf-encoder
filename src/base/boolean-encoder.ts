import { Decoded, Encoder } from '../interfaces';

export class BooleanEncoder implements Encoder<boolean> {

  private static instance: BooleanEncoder | null;

  public static getInstance() {
    if (!BooleanEncoder.instance) {
      BooleanEncoder.instance = new BooleanEncoder();
    }
    return BooleanEncoder.instance;
  }

  private constructor() { }

  encode(value: boolean): string {
    return +value + '';
  }

  decode(value: string): Decoded<boolean> {
    return {
      numBits: 1,
      decoded: value === '1'
    };
  }
}
