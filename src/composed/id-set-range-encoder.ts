import { BooleanEncoder, NumberEncoder } from "../base";
import { RangeType } from "../constants";
import { Decoded, Encoder } from "../interfaces";
import { IdSet } from "../model";

export class IdSetRangeEncoder implements Encoder<IdSet> {

  private numberEncoder = new NumberEncoder();
  private booleanEncoder = new BooleanEncoder();

  constructor(
    private maxId: number,
  ) { }

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

  decode(value: string): Decoded<IdSet> {
    // read defaultValue, 1 bit
    const { numBits: defaultBits, decoded: defaultValue } = this.booleanEncoder.decode(value.charAt(0));
    // read numEntries to process, 12 bit
    const { numBits: numEntiesBits, decoded: numEntries } = this.numberEncoder.decode(value.substr(1, 12));

    const idSet = new IdSet([], defaultValue, 1, this.maxId);

    let index = defaultBits + numEntiesBits;
    for (let i = 0; i < numEntries; i++) {
      const { numBits: rangeTypeBits, decoded: rangeType } = this.numberEncoder.decode(value.charAt(index));
      index += rangeTypeBits;

      const { numBits: firstIdBits, decoded: firstId } = this.numberEncoder.decode(value.substr(index, 16));
      index += firstIdBits;

      if (rangeType === RangeType.SINGLE_ID) {
        idSet.set(firstId, !defaultValue);
      } else if (rangeType === RangeType.ID_RANGE) {
        const { numBits: secondIdBits, decoded: secondId } = this.numberEncoder.decode(value.substr(index, 16));
        index += secondIdBits;

        for (let id = firstId; id <= secondId; id++) {
          idSet.set(id, !defaultValue);
        }
      }
    }
    return {
      numBits: index,
      decoded: idSet,
    };
  }
}
