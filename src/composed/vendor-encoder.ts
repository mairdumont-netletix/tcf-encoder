import { NumberEncoder } from "../base";
import { EncodingType } from "../constants";
import { Encoder } from "../interfaces";
import { IdSet } from "../model";
import { IdSetLinearEncoder } from "./id-set-linear-encoder";
import { IdSetRangeEncoder } from "./id-set-range-encoder";

export class VendorEncoder implements Encoder<IdSet> {

  private numberEncoder = new NumberEncoder();
  private idSetRangeEncoder = new IdSetRangeEncoder();
  private idSetLinearEncoder = new IdSetLinearEncoder();

  encode(idSet: IdSet): string {
    // create two different encodings of the same thing: linear and range encoding of vendors
    const vendorLinearBitString = this.idSetLinearEncoder.encode(idSet, idSet.maxId);
    const vendorRangeBitString = this.idSetRangeEncoder.encode(idSet);

    // maxId in 16 bits
    let bitString = this.numberEncoder.encode(idSet.maxId, 16);
    // depending of what is shorter, we use linear or range encoding
    if (vendorRangeBitString.length < vendorLinearBitString.length) {
      bitString += EncodingType.RANGE + vendorRangeBitString;
    } else {
      bitString += EncodingType.FIELD + vendorLinearBitString;
    }
    return bitString;
  }

  decode(value: string): IdSet {
    throw new Error("Method not implemented.");
  }
}
