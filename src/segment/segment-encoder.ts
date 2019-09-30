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
        const { bits, encoder, value } = fieldInfo;
        bitField += encoder.encode(value(tcModel), bits);
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
        const { bits, encoder } = fieldInfo;
        const chunk = bitField.substr(position, bits);
        const { numBits, decoded } = encoder.decode(chunk);
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
