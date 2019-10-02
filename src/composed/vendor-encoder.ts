import { NumberEncoder } from "../base";
import { EncodingType } from "../constants";
import { Decoded, Encoder } from "../interfaces";
import { IdSet } from "../model";
import { IdSetLinearEncoder } from "./id-set-linear-encoder";
import { IdSetRangeEncoder } from "./id-set-range-encoder";

export class VendorEncoder implements Encoder<IdSet> {

  private static instance: VendorEncoder | null;

  public static getInstance() {
    if (!VendorEncoder.instance) {
      VendorEncoder.instance = new VendorEncoder();
    }
    return VendorEncoder.instance;
  }

  private constructor() { }

  encode(idSet: IdSet): string {
    // create two different encodings of the same thing: linear and range encoding of vendors
    const vendorLinearBitString = IdSetLinearEncoder.getInstance().encode(idSet, idSet.maxId);
    const vendorRangeBitString = new IdSetRangeEncoder(idSet.maxId).encode(idSet);

    // maxId in 16 bits
    let bitString = NumberEncoder.getInstance().encode(idSet.maxId, 16);
    // depending of what is shorter, we use linear or range encoding
    if (vendorRangeBitString.length < vendorLinearBitString.length) {
      bitString += EncodingType.RANGE + vendorRangeBitString;
    } else {
      bitString += EncodingType.FIELD + vendorLinearBitString;
    }
    return bitString;
  }

  decode(value: string): Decoded<IdSet> {
    const numberEncoder = NumberEncoder.getInstance();
    const { numBits: maxIdBits, decoded: maxId } = numberEncoder.decode(value.substr(0, 16));
    const { numBits: encodingTypeBits, decoded: encodingType } = numberEncoder.decode(value.substr(16, 1));
    switch (encodingType) {
      case EncodingType.RANGE:
        const decoder = new IdSetRangeEncoder(maxId);
        const { numBits: rangeBits, decoded: rangeDecoded } = decoder.decode(value.substr(17, value.length - 17));
        return {
          numBits: maxIdBits + encodingTypeBits + rangeBits,
          decoded: rangeDecoded,
        }
      case EncodingType.FIELD:
        const { numBits, decoded } = IdSetLinearEncoder.getInstance().decode(value.substr(17, maxId));
        return {
          numBits: maxIdBits + encodingTypeBits + numBits,
          decoded,
        }
      default:
        throw new Error('invalid encodingType');
    }
  }
}
