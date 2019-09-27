import { NumberEncoder } from "../base";
import { EncodingType, RangeType } from "../constants";
import { Encoder } from "../interfaces";
import { IdSet } from "../model";
import { IdSetEncoder } from "./id-set-encoder";

export class VendorEncoder implements Encoder<IdSet> {

  private numberEncoder = new NumberEncoder();
  private idSetEncoder = new IdSetEncoder();

  encode(idSet: IdSet): string {
    // maxId in 16 bits
    let bitString = this.numberEncoder.encode(idSet.maxId, 16);

    // linear encoding of bits
    const bitField = this.idSetEncoder.encode(idSet, idSet.maxId);
    // calculate ranges and bitlength of range encoding
    const ranges: number[][] = idSet.getRanges();
    const rangesLength = this.calculateBitsOfRange(ranges);
    // depending of what is shorter, we use bitField or range encoding
    if (rangesLength < bitField.length) {
      bitString += `${EncodingType.RANGE}`;
      bitString += this.createRangeEncoding(ranges);
    } else {
      bitString += `${EncodingType.FIELD}`;
      bitString += bitField;
    }

    return bitString;
  }

  decode(value: string): IdSet {
    throw new Error("Method not implemented.");
  }

  private createRangeEncoding(ranges: number[][]): string {
    let bitString = '';
    // NumEntries, 12 bits, Number of RangeEntry sections to follow
    bitString += this.numberEncoder.encode(ranges.length, 12);
    ranges.forEach((range: number[]) => {
      if (range.length === 1) {
        bitString += this.numberEncoder.encode(RangeType.SINGLE_VENDOR_ID, 1);
        bitString += this.numberEncoder.encode(range[0], 16);
      } else if (range.length >= 2) {
        bitString += this.numberEncoder.encode(RangeType.VENDOR_ID_RANGE, 1);
        bitString += this.numberEncoder.encode(range[0], 16);
        bitString += this.numberEncoder.encode(range[1], 16);
      }
    });
    return bitString;
  }

  private calculateBitsOfRange(ranges: number[][]): number {
    let length = 1 + 12;
    ranges.forEach((range: number[]) => {
      length += 1;
      length += (range.length === 1) ? 16 : 32;
    });
    return length;
  }
}
