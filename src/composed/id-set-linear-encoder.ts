import { BooleanEncoder } from '../base/boolean-encoder';
import { Decoded, Encoder } from '../interfaces';
import { IdSet } from '../model/id-set';

export class IdSetLinearEncoder implements Encoder<IdSet> {

  private static instance: IdSetLinearEncoder | null;

  public static getInstance() {
    if (!IdSetLinearEncoder.instance) {
      IdSetLinearEncoder.instance = new IdSetLinearEncoder();
    }
    return IdSetLinearEncoder.instance;
  }

  private constructor() { }

  encode(value: IdSet, numBits: number): string {
    const booleanEncoder = BooleanEncoder.getInstance();
    let bitString = '';
    for (let i = 1; i <= numBits; i++) {
      bitString += booleanEncoder.encode(value.has(i));
    }
    return bitString;
  }

  decode(value: string): Decoded<IdSet> {
    const booleanEncoder = BooleanEncoder.getInstance();
    const idSet: IdSet = new IdSet();
    const len = value.length;
    for (let i = 1; i <= len; i++) {
      const { decoded: isTrue } = booleanEncoder.decode(value[i - 1]);
      if (isTrue) {
        idSet.add(i);
      }
    }
    return {
      numBits: len,
      decoded: idSet,
    }
  }
}
