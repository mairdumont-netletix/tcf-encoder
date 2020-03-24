import { BitFieldEncoder } from '../base';
import { Field } from '../constants';
import { Decoded, Encoder, FieldMap } from '../interfaces';
import { TCModel } from '../model/tc-model';
import { Singleton } from '../utils';

/**
 * Options to configure decoding of a segment.
 */
export interface SegmentDecodingOptions {
  /**
   * Object to apply the read field data from the segment while decoding.
   */
  tcModel: TCModel;
}

/**
 * Handles encoding/decoding of a TCF consent string segment.
 */
export class SegmentEncoder implements Encoder<TCModel, never, SegmentDecodingOptions> {

  constructor(
    private fieldMap: FieldMap,
  ) { }

  public encode(tcModel: TCModel): string {
    let bitField = '';
    for (const field in this.fieldMap) {
      const fieldInfo = this.fieldMap[field as Field];
      if (fieldInfo) {
        const { bits, getEncoder, getValue } = fieldInfo;
        // get a value we need to encode
        const value = getValue(tcModel);
        // encode the value with the given encoder into x bits
        bitField += getEncoder().encode(value, { numBits: bits });
      }
    }
    return bitField.length ? Singleton.of(BitFieldEncoder).encode(bitField) : '';
  }

  public decode(value: string, { tcModel }: SegmentDecodingOptions): Decoded<TCModel> {
    const { decoded: bitField } = Singleton.of(BitFieldEncoder).decode(value);

    let position = 0;
    for (const field in this.fieldMap) {
      const fieldInfo = this.fieldMap[field as Field];
      if (fieldInfo) {
        const { bits, getEncoder, setValue } = fieldInfo;
        // if we fieldinfo contains bit length, we split the bitField into a chunk
        const chunk = bitField.substr(position, bits);
        // decode chunk and extract information, numBits contains the number of processed bits
        const { numBits, decoded } = getEncoder().decode(chunk);
        // set the decoded value to the model
        setValue(tcModel, decoded);
        // increase bit position pointer by number of processed bits
        position += numBits;
        // console.log(bitField, field, decoded);
      }
    }
    return {
      numBits: position,
      decoded: tcModel,
    }
  }
}
