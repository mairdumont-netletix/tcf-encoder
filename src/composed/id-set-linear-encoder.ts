import { BooleanEncoder } from '../base/boolean-encoder';
import { Decoded, Encoder } from '../interfaces';
import { IdSet } from '../model/id-set';
import { Singleton } from '../utils';

export interface IdSetLinearEncodingOptions {
  numBits?: number;
}

export class IdSetLinearEncoder implements Encoder<IdSet, IdSetLinearEncodingOptions> {

  public encode(value: IdSet, { numBits }: IdSetLinearEncodingOptions = {}): string {
    const bits = numBits || value.maxId;
    const booleanEncoder = Singleton.of(BooleanEncoder);
    let bitString = '';
    for (let i = 1; i <= bits; i++) {
      bitString += booleanEncoder.encode(value.has(i));
    }
    return bitString;
  }

  public decode(value: string): Decoded<IdSet> {
    const booleanEncoder = Singleton.of(BooleanEncoder);
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
