import { Encoder } from '../interfaces';

export class BooleanEncoder implements Encoder<boolean> {
  encode(value: boolean): string {
    return +value + '';
  }

  decode(value: string): boolean {
    return value === '1';
  }
}
