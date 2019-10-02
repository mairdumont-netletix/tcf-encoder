import { BitFieldEncoder } from "../base";
import { Field } from "../constants";
import { Decoded, Encoder, FieldMap } from "../interfaces";
import { TCModel } from "../model/tc-model";

export class SegmentEncoder implements Encoder<TCModel> {

  private bitfieldEncoder = new BitFieldEncoder();

  constructor(
    private fieldMap: FieldMap,
  ) { }

  encode(tcModel: TCModel): string {
    let bitField = '';
    for (const field in this.fieldMap) {
      const fieldInfo = this.fieldMap[field as Field];
      if (fieldInfo) {
        const { bits, encoder, getValue } = fieldInfo;
        // get a value we need to encode
        const value = getValue(tcModel);
        // encode the value with the given encoder into x bits
        bitField += encoder.encode(value, bits);
      }
    }
    return this.bitfieldEncoder.encode(bitField);
  }

  decode(value: string, tcModel: TCModel): Decoded<TCModel> {
    const { decoded: bitField } = this.bitfieldEncoder.decode(value);

    let position = 0;
    for (const field in this.fieldMap) {
      const fieldInfo = this.fieldMap[field as Field];
      if (fieldInfo) {
        const { bits, encoder, setValue } = fieldInfo;
        // if we fieldinfo contains bit lenght, we split the bitField into chunk
        const chunk = bitField.substr(position, bits);
        // decode chunk and extract information, numBits contains the number of processed bits
        const { numBits, decoded } = encoder.decode(chunk);
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
