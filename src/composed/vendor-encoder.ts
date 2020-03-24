import { NumberEncoder } from '../base';
import { EncodingType } from '../constants';
import { Decoded, Encoder } from '../interfaces';
import { IdSet } from '../model';
import { Singleton } from '../utils';
import { IdSetLinearEncoder } from './id-set-linear-encoder';
import { IdSetRangeEncoder } from './id-set-range-encoder';

/**
 * Handles encoding/decoding of a vendor id set.
 */
export class VendorEncoder implements Encoder<IdSet, never, never> {

  /**
   * Encodes a vendor id set.
   *
   * This encoding is length optimized, it uses linear or range encoding,
   * depending of what is shorter for the specific ids to be encoded.
   *
   * @param idSet set of ids to encode
   */
  public encode(idSet: IdSet): string {
    const idSetLinearEncoder = Singleton.of(IdSetLinearEncoder);
    const idSetRangeEncoder = Singleton.of(IdSetRangeEncoder);

    // create two different encodings of the same thing: linear and range encoding of vendors
    const vendorLinearBitString = idSetLinearEncoder.encode(idSet);
    const vendorRangeBitString = idSetRangeEncoder.encode(idSet);

    // maxId in 16 bits
    let bitString = Singleton.of(NumberEncoder).encode(idSet.maxId, { numBits: 16 });
    // depending of what is shorter, we use linear or range encoding
    if (vendorRangeBitString.length < vendorLinearBitString.length) {
      bitString += EncodingType.RANGE + vendorRangeBitString;
    } else {
      bitString += EncodingType.FIELD + vendorLinearBitString;
    }
    return bitString;
  }

  /**
   * Decodes a binary string into a set of vendor ids, analyzing of a
   * linear or range encoding is used.
   *
   * @param value binary string to decode
   */
  public decode(value: string): Decoded<IdSet> {
    const numberEncoder = Singleton.of(NumberEncoder);
    const idSetLinearEncoder = Singleton.of(IdSetLinearEncoder);
    const idSetRangeEncoder = Singleton.of(IdSetRangeEncoder);
    // read 16 bit for the encoded maxId
    const { numBits: maxIdBits, decoded: maxId } = numberEncoder.decode(value.substr(0, 16));
    // read 1 bit to check if linear or range encoding is used
    const { numBits: encodingTypeBits, decoded: encodingType } = numberEncoder.decode(value.substr(16, 1));
    switch (encodingType) {
      case EncodingType.RANGE:
        // use range decoder to read/decode the rest of the string with range encoding
        const { numBits: rangeBits, decoded: rangeDecoded } = idSetRangeEncoder.decode(value.substr(17, value.length - 17), { maxId });
        return {
          numBits: maxIdBits + encodingTypeBits + rangeBits,
          decoded: rangeDecoded,
        }
      case EncodingType.FIELD:
        // use linear decoder to read/decode the rest of the string with linear encoding
        const { numBits, decoded } = idSetLinearEncoder.decode(value.substr(17, maxId));
        return {
          numBits: maxIdBits + encodingTypeBits + numBits,
          decoded,
        }
      default:
        // something was wrong as there is no range or linear encoding specified
        throw new Error(`invalid encodingType: ${encodingType}`);
    }
  }
}
