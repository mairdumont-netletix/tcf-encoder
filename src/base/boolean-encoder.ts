import { Decoded, Encoder } from '../interfaces';

export class BooleanEncoder implements Encoder<boolean> {
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
