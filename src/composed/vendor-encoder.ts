import { NumberEncoder } from '../base';
import { EncodingType } from '../constants';
import { Decoded, Encoder } from '../interfaces';
import { IdSet } from '../model';
import { Singleton } from '../utils';
import { IdSetLinearEncoder } from './id-set-linear-encoder';
import { IdSetRangeEncoder } from './id-set-range-encoder';

export class VendorEncoder implements Encoder<IdSet, never, never> {

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

  public decode(value: string): Decoded<IdSet> {
    const numberEncoder = Singleton.of(NumberEncoder);
    const idSetLinearEncoder = Singleton.of(IdSetLinearEncoder);
    const idSetRangeEncoder = Singleton.of(IdSetRangeEncoder);

    const { numBits: maxIdBits, decoded: maxId } = numberEncoder.decode(value.substr(0, 16));
    const { numBits: encodingTypeBits, decoded: encodingType } = numberEncoder.decode(value.substr(16, 1));
    switch (encodingType) {
      case EncodingType.RANGE:
        const { numBits: rangeBits, decoded: rangeDecoded } = idSetRangeEncoder.decode(value.substr(17, value.length - 17), { maxId });
        return {
          numBits: maxIdBits + encodingTypeBits + rangeBits,
          decoded: rangeDecoded,
        }
      case EncodingType.FIELD:
        const { numBits, decoded } = idSetLinearEncoder.decode(value.substr(17, maxId));
        return {
          numBits: maxIdBits + encodingTypeBits + numBits,
          decoded,
        }
      default:
        throw new Error('invalid encodingType');
    }
  }
}
