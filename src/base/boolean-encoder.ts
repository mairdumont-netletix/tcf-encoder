import { Decoded, Encoder } from '../interfaces';

export class BooleanEncoder implements Encoder<boolean, never, never> {

  public encode(value: boolean): string {
    return +value + '';
  }

  public decode(value: string): Decoded<boolean> {
    return {
      numBits: 1,
      decoded: value === '1'
    };
  }
}
