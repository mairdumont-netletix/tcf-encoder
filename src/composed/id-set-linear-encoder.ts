import { BooleanEncoder } from '../base/boolean-encoder';
import { Decoded, Encoder } from '../interfaces';
import { IdSet } from '../model/id-set';
import { Singleton } from '../utils';

/**
 * Options to configure encoding of a id set.
 */
export interface IdSetLinearEncodingOptions {
  /**
   * number of bits to use for encoding
   */
  numBits?: number;
}

/**
 * Handles encoding/decoding of a set of IDs into a linear binary bit string.
 */
export class IdSetLinearEncoder implements Encoder<IdSet, IdSetLinearEncodingOptions, never> {

  /**
   * Encodes a set of IDs into a linear binary bit string.
   *
   * @param value set of ordered and unique IDs
   * @param options configures how to encode the id set
   */
  public encode(value: IdSet, { numBits }: IdSetLinearEncodingOptions = {}): string {
    const bits = numBits || value.maxId;
    const booleanEncoder = Singleton.of(BooleanEncoder);
    let bitString = '';
    for (let i = 1; i <= bits; i++) {
      bitString += booleanEncoder.encode(value.has(i));
    }
    return bitString;
  }

  /**
   * Decodes a linear binary bit string into a set of ids.
   *
   * @param value linear binary bit string to decode
   */
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
