import { Encoder } from '../encoder';
import { IdSet } from '../model/id-set';
import { BooleanEncoder } from './boolean-encoder';

export class IdSetEncoder implements Encoder<IdSet> {

  private booleanEncoder = new BooleanEncoder();

  encode(value: IdSet, numBits: number): string {
    let bitString = '';
    for (let i = 1; i <= numBits; i++) {
      bitString += this.booleanEncoder.encode(value.has(i));
    }
    return bitString;
  }

  decode(value: string): IdSet {
    const idSet: IdSet = new IdSet();
    for (let i = 1; i <= value.length; i++) {
      if (this.booleanEncoder.decode(value[i - 1])) {
        idSet.add(i);
      }
    }
    return idSet;
  }
}
