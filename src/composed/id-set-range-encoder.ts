import { NumberEncoder } from "../base";
import { RangeType } from "../constants";
import { Encoder } from "../interfaces";
import { IdSet } from "../model";

export class IdSetRangeEncoder implements Encoder<IdSet> {

  private numberEncoder = new NumberEncoder();

  encode(idSet: IdSet): string {
    const ranges: number[][] = idSet.getRanges();
    // NumEntries, 12 bits, Number of RangeEntry sections to follow
    let bitString = this.numberEncoder.encode(ranges.length, 12);
    ranges.forEach((range: number[]) => {
      if (range.length === 1) {
        bitString += this.numberEncoder.encode(RangeType.SINGLE_ID, 1);
        bitString += this.numberEncoder.encode(range[0], 16);
      } else if (range.length >= 2) {
        bitString += this.numberEncoder.encode(RangeType.ID_RANGE, 1);
        bitString += this.numberEncoder.encode(range[0], 16);
        bitString += this.numberEncoder.encode(range[1], 16);
      }
    });
    return bitString;
  }

  decode(value: string, target?: IdSet | undefined): IdSet {
    throw new Error("Method not implemented.");
  }
}
