import { BooleanEncoder } from '../base/boolean-encoder';
import { Decoded, Encoder } from '../interfaces';
import { IdSet } from '../model/id-set';

export class IdSetLinearEncoder implements Encoder<IdSet> {

  private booleanEncoder = new BooleanEncoder();

  encode(value: IdSet, numBits: number): string {
    let bitString = '';
    for (let i = 1; i <= numBits; i++) {
      bitString += this.booleanEncoder.encode(value.has(i));
    }
    return bitString;
  }

  decode(value: string): Decoded<IdSet> {
    const idSet: IdSet = new IdSet();
    const len = value.length;
    for (let i = 1; i <= len; i++) {
      const { decoded: isTrue } = this.booleanEncoder.decode(value[i - 1]);
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
