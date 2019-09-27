import { NumberEncoder } from "../base";
import { RangeType } from "../constants";
import { Encoder } from "../interfaces";
import { IdSet } from "../model";

export class IdSetRangeEncoder implements Encoder<IdSet> {

  private numberEncoder = new NumberEncoder();

  encode(idSet: IdSet): string {
    const ranges: number[][] = idSet.getRanges();
    // defaultValue, 1 bit, default is 0
    let bitString = '0';
    // NumEntries, 12 bits, Number of RangeEntry sections to follow
    bitString += this.numberEncoder.encode(ranges.length, 12);
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

  decode(value: string, idSet: IdSet = new IdSet()): IdSet {
    const defaultValue: number = this.numberEncoder.decode(value.charAt(0));

    if (defaultValue) {
      // assume that the last 16 bits contains the maximum id
      const maxId: number = this.numberEncoder.decode(value.substr(value.length - 16, 16));
      for (let singleId = 1; singleId <= maxId; singleId++) {
        idSet.add(singleId);
      }
    }

    const numEntries: number = this.numberEncoder.decode(value.substr(1, 12));
    let index = 13;
    for (let i = 0; i < numEntries; i++) {
      const rangeType: number = this.numberEncoder.decode(value.charAt(index++));
      if (rangeType === RangeType.SINGLE_ID) {
        const singleId: number = this.numberEncoder.decode(value.substr(index, 16));
        index += 16;
        if (defaultValue) {
          idSet.delete(singleId);
        } else {
          idSet.add(singleId);
        }
      } else if (rangeType === RangeType.ID_RANGE) {
        const firstId: number = this.numberEncoder.decode(value.substr(index, 16));
        const secondId: number = this.numberEncoder.decode(value.substr(index + 16, 16));
        index += 32;
        for (let singleId = firstId; singleId <= secondId; singleId++) {
          if (defaultValue) {
            idSet.delete(singleId);
          } else {
            idSet.add(singleId);
          }
        }
      }
    }
    return idSet;
  }
}
